import express from 'express';
import cors from 'cors';
import dotenv from 'dotenv';
import { PrismaClient } from '@prisma/client';

// Importar todas as rotas
import authRoutes from './routes/auth';
import productsRoutes from './routes/products';
import brandsRoutes from './routes/brands';
import categoriesRoutes from './routes/categories';
import cartRoutes from './routes/cart';
import wishlistRoutes from './routes/wishlist';
import ordersRoutes from './routes/orders';
import addressesRoutes from './routes/addresses';
import usersRoutes from './routes/users';

dotenv.config();

const app = express();
const prisma = new PrismaClient();
const PORT = process.env.PORT || 3001;

// Middlewares
app.use(cors({
  origin: ["http://192.168.15.167:5173", "http://localhost:5173"],
}));


app.use(express.json());


// Rotas
app.use("/api/auth", authRoutes);
app.use("/api/products", productsRoutes);
app.use("/api/brands", brandsRoutes);
app.use("/api/categories", categoriesRoutes);
app.use("/api/cart", cartRoutes);
app.use("/api/wishlist", wishlistRoutes);
app.use("/api/orders", ordersRoutes);
app.use("/api/addresses", addressesRoutes);
app.use("/api/users", usersRoutes); // SEM barra no final

// Iniciar servidor
app.listen(PORT, () => {
  console.log(`🚀 Servidor rodando na porta ${PORT}`);
  console.log(`📱 Frontend: http://localhost:3000`);
  console.log(`⚡ Backend: http://localhost:${PORT}`);
  console.log(`📋 Endpoints disponíveis:`);
  console.log(`   - Auth: http://localhost:${PORT}/api/auth`);
  console.log(`   - Products: http://localhost:${PORT}/api/products`);
  console.log(`   - Brands: http://localhost:${PORT}/api/brands`);
  console.log(`   - Categories: http://localhost:${PORT}/api/categories`);
  console.log(`   - Cart: http://localhost:${PORT}/api/cart`);
  console.log(`   - Wishlist: http://localhost:${PORT}/api/wishlist`);
  console.log(`   - Orders: http://localhost:${PORT}/api/orders`);
  console.log(`   - Addresses: http://localhost:${PORT}/api/addresses`);
  console.log(`   - Users: http://localhost:${PORT}/api/users`);
});

process.on('beforeExit', async () => {
  await prisma.$disconnect();
});

export default app;
  