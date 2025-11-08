// src/routes/users.ts
import { Router } from "express";
import { PrismaClient } from "@prisma/client";
import bcrypt from "bcryptjs";
import jwt from "jsonwebtoken";

const router = Router();
const prisma = new PrismaClient();

// Health check
router.get("/health", (_req, res) => {
  return res.status(200).send("ok");
});

// ✅ NOVA ROTA: Buscar todos os usuários
router.get("/", async (req, res) => {
  try {
    const users = await prisma.user.findMany({
      select: {
        id: true,
        firstName: true,
        lastName: true,
        email: true,
        phone: true,
        birthDate: true,
        isActive: true,
        createdAt: true,
      },
      orderBy: {
        createdAt: 'desc'
      }
    });

    // Transformar para o formato esperado pelo frontend
    const formattedUsers = users.map(user => ({
      id: user.id,
      first_name: user.firstName,
      last_name: user.lastName,
      email: user.email,
      phone: user.phone,
      birth_date: user.birthDate,
      is_active: user.isActive,
      created_at: user.createdAt
    }));

    return res.json(formattedUsers);
  } catch (e) {
    console.error("GET /users error:", e);
    return res.status(500).json({ error: "Erro ao buscar usuários" });
  }
});

// Criar usuário
router.post("/", async (req, res) => {
  try {
    const { first_name, last_name, email, phone, birth_date, password } = req.body;

    if (!first_name || !email || !password) {
      return res.status(400).json({ error: "first_name, email e password são obrigatórios." });
    }

    const exists = await prisma.user.findUnique({ where: { email } });
    if (exists) return res.status(409).json({ error: "E-mail já cadastrado." });

    const passwordHash = await bcrypt.hash(password, 10);

    const user = await prisma.user.create({
      data: {
        firstName: first_name,
        lastName: last_name || null,
        email,
        phone: phone || null,
        birthDate: birth_date ? new Date(birth_date) : null,
        passwordHash,
        isActive: true,
      },
      select: {
        id: true,
        firstName: true,
        lastName: true,
        email: true,
        phone: true,
        birthDate: true,
        isActive: true,
        createdAt: true,
      },
    });

    const token = jwt.sign(
      { sub: user.id, email: user.email },
      process.env.JWT_SECRET || "dev_secret",
      { expiresIn: "7d" }
    );

    return res.status(201).json({ token, user });
  } catch (e) {
    console.error("POST /users error:", e);
    return res.status(500).json({ error: "Erro ao criar usuário" });
  }
});

export default router;
