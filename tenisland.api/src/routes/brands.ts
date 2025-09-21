import { Router } from 'express';
import { PrismaClient } from '@prisma/client';

const router = Router();
const prisma = new PrismaClient();

// GET /api/brands - Listar todas as marcas
router.get('/', async (req, res) => {
  try {
    const brands = await prisma.brand.findMany();
    res.json(brands);
  } catch (error) {
    res.status(500).json({ error: 'Erro ao buscar marcas' });
  }
});

// POST /api/brands - Criar nova marca
router.post('/', async (req, res) => {
  try {
    const brand = await prisma.brand.create({
      data: req.body
    });
    res.status(201).json(brand);
  } catch (error) {
    res.status(500).json({ error: 'Erro ao criar marca' });
  }
});
router.delete('/:id', async (req, res) => {
  try {
    await prisma.brand.delete({
      where: { id: parseInt(req.params.id) }
    });
    
    res.json({ message: 'Marca removida com sucesso' });
  } catch (error) {
    res.status(500).json({ error: 'Erro ao remover marca' });
  }
});

export default router;
