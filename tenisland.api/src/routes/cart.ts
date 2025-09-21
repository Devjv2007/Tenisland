import { Router } from 'express';
import { PrismaClient } from '@prisma/client';
import { authMiddleware, AuthRequest } from '../middleware/authMiddleware';

const router = Router();
const prisma = new PrismaClient();

// GET /cart - Ver carrinho do usuário
router.get('/', authMiddleware, async (req: AuthRequest, res) => {
  try {
    let cart = await prisma.cart.findUnique({
      where: { user_id: req.userId },
      include: {
        cart_items: {
          include: {
            product: {
              include: { brand: true, category: true }
            }
          }
        }
      }
    });

    if (!cart) {
      cart = await prisma.cart.create({
        data: { user_id: req.userId! },
        include: {
          cart_items: {
            include: {
              product: {
                include: { brand: true, category: true }
              }
            }
          }
        }
      });
    }

    res.json(cart);
  } catch (error) {
    res.status(500).json({ error: 'Erro ao buscar carrinho' });
  }
});

// POST /cart/items - Adicionar item ao carrinho
router.post('/items', authMiddleware, async (req: AuthRequest, res) => {
  try {
    const { product_id, quantity } = req.body;

    let cart = await prisma.cart.findUnique({ where: { user_id: req.userId } });
    
    if (!cart) {
      cart = await prisma.cart.create({ data: { user_id: req.userId! } });
    }

    const existingItem = await prisma.cartItem.findFirst({
      where: { cart_id: cart.id, product_id }
    });

    if (existingItem) {
      const updatedItem = await prisma.cartItem.update({
        where: { id: existingItem.id },
        data: { quantity: existingItem.quantity + quantity }
      });
      res.json(updatedItem);
    } else {
      const newItem = await prisma.cartItem.create({
        data: { cart_id: cart.id, product_id, quantity }
      });
      res.status(201).json(newItem);
    }
  } catch (error) {
    res.status(500).json({ error: 'Erro ao adicionar item' });
  }
});

// PUT /cart/items/:id - Atualizar quantidade
router.put('/items/:id', authMiddleware, async (req: AuthRequest, res) => {
  try {
    const { quantity } = req.body;
    
    const item = await prisma.cartItem.update({
      where: { id: parseInt(req.params.id) },
      data: { quantity }
    });
    
    res.json(item);
  } catch (error) {
    res.status(500).json({ error: 'Erro ao atualizar item' });
  }
});

// DELETE /cart/items/:id - Remover item
router.delete('/items/:id', authMiddleware, async (req: AuthRequest, res) => {
  try {
    await prisma.cartItem.delete({
      where: { id: parseInt(req.params.id) }
    });
    
    res.json({ message: 'Item removido com sucesso' });
  } catch (error) {
    res.status(500).json({ error: 'Erro ao remover item' });
  }
});

export default router;
