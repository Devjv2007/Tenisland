import { Router } from 'express';
import { PrismaClient } from '@prisma/client';
import { authMiddleware, AuthRequest } from '../middleware/authMiddleware';

const router = Router();
const prisma = new PrismaClient();

// GET /orders - Listar pedidos do usuário
router.get('/', authMiddleware, async (req: AuthRequest, res) => {
  try {
    const orders = await prisma.order.findMany({
      where: { user_id: req.userId },
      include: {
        order_items: {
          include: {
            product: {
              include: { brand: true }
            }
          }
        },
        shipping_address: true
      },
      orderBy: { order_date: 'desc' }
    });
    
    res.json(orders);
  } catch (error) {
    res.status(500).json({ error: 'Erro ao buscar pedidos' });
  }
});

// POST /orders - Criar novo pedido
router.post('/', authMiddleware, async (req: AuthRequest, res) => {
  try {
    const { shipping_address_id, payment_method, items } = req.body;
    
    // Calcular total
    let total = 0;
    for (const item of items) {
      const product = await prisma.product.findUnique({ where: { id: item.product_id } });
      total += product!.price.toNumber() * item.quantity;
    }
    
    // Criar pedido
    const order = await prisma.order.create({
      data: {
        user_id: req.userId!,
        total_amount: total,
        shipping_address_id,
        payment_method,
        order_items: {
          create: items.map((item: any) => ({
            product_id: item.product_id,
            quantity: item.quantity,
            unit_price: item.unit_price,
            total_price: item.unit_price * item.quantity
          }))
        }
      },
      include: {
        order_items: {
          include: { product: true }
        }
      }
    });
    
    res.status(201).json(order);
  } catch (error) {
    res.status(500).json({ error: 'Erro ao criar pedido' });
  }
});

// GET /orders/:id - Buscar pedido específico
router.get('/:id', authMiddleware, async (req: AuthRequest, res) => {
  try {
    const order = await prisma.order.findFirst({
      where: { 
        id: parseInt(req.params.id),
        user_id: req.userId 
      },
      include: {
        order_items: {
          include: {
            product: {
              include: { brand: true }
            }
          }
        },
        shipping_address: true
      }
    });
    
    if (!order) {
      return res.status(404).json({ error: 'Pedido não encontrado' });
    }
    
    res.json(order);
  } catch (error) {
    res.status(500).json({ error: 'Erro ao buscar pedido' });
  }
});

export default router;
