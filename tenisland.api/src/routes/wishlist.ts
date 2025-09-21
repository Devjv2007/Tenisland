import { Router } from 'express';
import { PrismaClient } from '@prisma/client';
import { authMiddleware, AuthRequest } from '../middleware/authMiddleware';

const router = Router();
const prisma = new PrismaClient();

// GET /wishlist - Ver lista de desejos
router.get('/', authMiddleware, async (req: AuthRequest, res) => {
  try {
    const wishlist = await prisma.wishlist.findMany({
      where: { user_id: req.userId },
      include: {
        product: {
          include: { brand: true, category: true }
        }
      }
    });
    
    res.json(wishlist);
  } catch (error) {
    res.status(500).json({ error: 'Erro ao buscar wishlist' });
  }
});

// POST /wishlist - Adicionar à lista de desejos
router.post('/', authMiddleware, async (req: AuthRequest, res) => {
  try {
    const { product_id } = req.body;
    
    const wishlistItem = await prisma.wishlist.create({
      data: { user_id: req.userId!, product_id },
      include: {
        product: {
          include: { brand: true, category: true }
        }
      }
    });
    
    res.status(201).json(wishlistItem);
  } catch (error) {
    res.status(500).json({ error: 'Erro ao adicionar à wishlist' });
  }
});

// DELETE /wishlist/:productId - Remover da lista de desejos
router.delete('/:productId', authMiddleware, async (req: AuthRequest, res) => {
  try {
    await prisma.wishlist.deleteMany({
      where: { 
        user_id: req.userId,
        product_id: parseInt(req.params.productId)
      }
    });
    
    res.json({ message: 'Item removido da wishlist' });
  } catch (error) {
    res.status(500).json({ error: 'Erro ao remover da wishlist' });
  }
});

export default router;
