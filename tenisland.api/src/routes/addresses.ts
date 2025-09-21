import { Router } from 'express';
import { PrismaClient } from '@prisma/client';
import { authMiddleware, AuthRequest } from '../middleware/authMiddleware';

const router = Router();
const prisma = new PrismaClient();

// GET /addresses - Listar endereços do usuário
router.get('/', authMiddleware, async (req: AuthRequest, res) => {
  try {
    const addresses = await prisma.userAddress.findMany({
      where: { user_id: req.userId },
      orderBy: { is_default: 'desc' }
    });
    
    res.json(addresses);
  } catch (error) {
    res.status(500).json({ error: 'Erro ao buscar endereços' });
  }
});

// POST /addresses - Criar novo endereço
router.post('/', authMiddleware, async (req: AuthRequest, res) => {
  try {
    const addressData = { ...req.body, user_id: req.userId };
    
    const address = await prisma.userAddress.create({
      data: addressData
    });
    
    res.status(201).json(address);
  } catch (error) {
    res.status(500).json({ error: 'Erro ao criar endereço' });
  }
});

// PUT /addresses/:id - Atualizar endereço
router.put('/:id', authMiddleware, async (req: AuthRequest, res) => {
  try {
    const address = await prisma.userAddress.updateMany({
      where: { 
        id: parseInt(req.params.id),
        user_id: req.userId 
      },
      data: req.body
    });
    
    res.json({ message: 'Endereço atualizado com sucesso' });
  } catch (error) {
    res.status(500).json({ error: 'Erro ao atualizar endereço' });
  }
});

// DELETE /addresses/:id - Remover endereço
router.delete('/:id', authMiddleware, async (req: AuthRequest, res) => {
  try {
    await prisma.userAddress.deleteMany({
      where: { 
        id: parseInt(req.params.id),
        user_id: req.userId 
      }
    });
    
    res.json({ message: 'Endereço removido com sucesso' });
  } catch (error) {
    res.status(500).json({ error: 'Erro ao remover endereço' });
  }
});

export default router;
