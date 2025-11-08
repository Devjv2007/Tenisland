// src/routes/orders.ts
import { Router } from "express";
import { PrismaClient } from "@prisma/client";

const router = Router();
const prisma = new PrismaClient();

// Criar pedido
router.post("/", async (req, res) => {
  try {
    const {
      userId,
      customerName,
      totalAmount,
      items
    } = req.body;

    console.log("📦 Dados recebidos:", req.body);

    // Validações básicas
    if (!items || !Array.isArray(items) || items.length === 0) {
      return res.status(400).json({ error: "O pedido deve conter pelo menos um item" });
    }

    // Validar productIds
    const productIds = items.map((item: any) => parseInt(item.productId));
    
    // Validar se os produtos existem
    const products = await prisma.product.findMany({
      where: { id: { in: productIds } }
    });

    if (products.length !== productIds.length) {
      return res.status(400).json({ error: "Um ou mais produtos não existem" });
    }

    // Criar pedido com itens
    const order = await prisma.order.create({
      data: {
        userId: userId || null,
        name: customerName,
        totalAmount: parseFloat(totalAmount),
        status: 'pending',
        paymentStatus: 'pending',
        orderDate: new Date(),
        orderItems: {
          create: items.map((item: any) => ({
            productId: parseInt(item.productId),
            quantity: parseInt(item.quantity),
            price: parseFloat(item.price),
            size: item.size || null
          }))
        }
      },
      include: {
        orderItems: {
          include: {
            product: true
          }
        }
      }
    });

    console.log(`✅ Pedido #${order.id} criado com sucesso`);

    return res.status(201).json({
      success: true,
      message: "Pedido criado com sucesso",
      order
    });
    
  } catch (error) {
    console.error("❌ Erro ao criar pedido:", error);
    return res.status(500).json({ 
      error: "Erro ao criar pedido",
      details: error instanceof Error ? error.message : 'Erro desconhecido'
    });
  }
});

export default router;
