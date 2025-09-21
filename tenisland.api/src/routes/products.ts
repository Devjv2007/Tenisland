import { Router } from 'express';
import { PrismaClient } from '@prisma/client';

const router = Router();
const prisma = new PrismaClient();

// GET - Listar todos os produtos
router.get('/', async (req, res) => {
  try {
    const products = await prisma.product.findMany({
      include: {
        brand: true,
        category: true
      }
    });
    res.json(products);
  } catch (error) {
    console.error('Erro ao buscar produtos:', error);
    res.status(500).json({ error: 'Erro ao buscar produtos' });
  }
});

// GET - Buscar produto por ID
router.get('/:id', async (req, res) => {
  try {
    const { id } = req.params;
    const product = await prisma.product.findUnique({
      where: { id: parseInt(id) },
      include: {
        brand: true,
        category: true
      }
    });
    
    if (!product) {
      return res.status(404).json({ error: 'Produto não encontrado' });
    }
    
    res.json(product);
  } catch (error) {
    console.error('Erro ao buscar produto:', error);
    res.status(500).json({ error: 'Erro ao buscar produto' });
  }
});

// POST - Criar novo produto
router.post('/', async (req, res) => {
  try {
    const {
      name,
      description,
      brand_id,
      category_id,
      price,
      stock_quantity,
      size,
      color,
      image1,
      image2,
      image3,
      image4,
      image5,
      is_active
    } = req.body;

    console.log('📝 [CREATE] Dados recebidos:', req.body);

    const product = await prisma.product.create({
      data: {
        name,
        description,
        brand_id: parseInt(brand_id),
        category_id: parseInt(category_id),
        price: parseFloat(price),
        stock_quantity: parseInt(stock_quantity),
        size: size || null,
        color: color || null,
        image1: image1 || null,
        image2: image2 || null,
        image3: image3 || null,
        image4: image4 || null,
        image5: image5 || null,
        is_active: is_active ?? true
      },
      include: {
        brand: true,
        category: true
      }
    });

    console.log('✅ [CREATE] Produto criado:', product.id);
    res.status(201).json(product);
  } catch (error) {
    console.error('❌ [CREATE] Erro ao criar produto:', error);
    res.status(500).json({ error: 'Erro ao criar produto' });
  }
});

// PUT - Atualizar produto (CORRIGIDO PARA 5 IMAGENS)
router.put('/:id', async (req, res) => {
  try {
    const { id } = req.params;
    const {
      name,
      description,
      brand_id,
      category_id,
      price,
      stock_quantity,
      size,
      color,
      image1,
      image2,
      image3,
      image4,
      image5,
      is_active
    } = req.body;

    console.log('📝 [UPDATE] ID:', id);
    console.log('📝 [UPDATE] Dados recebidos:', req.body);

    // Verificar se produto existe
    const existingProduct = await prisma.product.findUnique({
      where: { id: parseInt(id) }
    });

    if (!existingProduct) {
      return res.status(404).json({ error: 'Produto não encontrado' });
    }

    // Atualizar produto
    const product = await prisma.product.update({
      where: { id: parseInt(id) },
      data: {
        name,
        description: description || null,
        brand_id: parseInt(brand_id),
        category_id: parseInt(category_id),
        price: parseFloat(price),
        stock_quantity: parseInt(stock_quantity),
        size: size || null,
        color: color || null,
        image1: image1 || null,
        image2: image2 || null,  // ← ADICIONADO
        image3: image3 || null,  // ← ADICIONADO
        image4: image4 || null,  // ← ADICIONADO
        image5: image5 || null,  // ← ADICIONADO
        is_active: is_active ?? true
      },
      include: {
        brand: true,
        category: true
      }
    });

    console.log('✅ [UPDATE] Produto atualizado:', product.id);
    res.json(product);
  } catch (error) {
    console.error('❌ [UPDATE] Erro ao atualizar produto:', error);
    res.status(500).json({ error: 'Erro ao atualizar produto' });
  }
});

// DELETE - Deletar produto
router.delete('/:id', async (req, res) => {
  try {
    const { id } = req.params;
    
    console.log('🗑️ [DELETE] ID:', id);

    // Verificar se produto existe
    const existingProduct = await prisma.product.findUnique({
      where: { id: parseInt(id) }
    });

    if (!existingProduct) {
      return res.status(404).json({ error: 'Produto não encontrado' });
    }

    await prisma.product.delete({
      where: { id: parseInt(id) }
    });

    console.log('✅ [DELETE] Produto deletado:', id);
    res.json({ message: 'Produto deletado com sucesso' });
  } catch (error) {
    console.error('❌ [DELETE] Erro ao deletar produto:', error);
    res.status(500).json({ error: 'Erro ao deletar produto' });
  }
});

export default router;
