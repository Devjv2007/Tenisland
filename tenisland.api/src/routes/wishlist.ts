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
    console.error('❌ Erro ao buscar wishlist:', error);
    res.status(500).json({ error: 'Erro ao buscar wishlist' });
  }
});

// POST /wishlist - Adicionar à lista de desejos
router.post('/', authMiddleware, async (req: AuthRequest, res) => {
  console.log('=== INICIANDO POST WISHLIST ===');
  console.log('req.userId:', req.userId);
  console.log('req.body:', req.body);
  
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
    
    console.log('✅ Wishlist criada com sucesso!');
    res.status(201).json(wishlistItem);
  } catch (error) {
    console.error('❌ ERRO COMPLETO:', error);
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
    console.error('❌ Erro ao remover da wishlist:', error);
    res.status(500).json({ error: 'Erro ao remover da wishlist' });
  }
});

export default router;
