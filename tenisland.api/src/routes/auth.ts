// src/routes/auth.ts
import { Router } from "express";
import { PrismaClient } from "@prisma/client";
import bcrypt from "bcryptjs";
import jwt from "jsonwebtoken";

const router = Router();
const prisma = new PrismaClient();

// Login
router.post("/login", async (req, res) => {
  try {
    const { email, password } = req.body;

    if (!email || !password) {
      return res.status(400).json({ error: "E-mail e senha são obrigatórios." });
    }

    const user = await prisma.user.findUnique({ 
      where: { email: email.toLowerCase().trim() },
      select: {
        id: true,
        firstName: true,
        lastName: true,
        email: true,
        phone: true,
        birthDate: true,
        isActive: true,
        passwordHash: true,
        createdAt: true,
      }
    });

    if (!user) {
      return res.status(401).json({ error: "E-mail ou senha incorretos." });
    }

    if (!user.isActive) {
      return res.status(403).json({ error: "Conta inativa." });
    }

    const validPassword = await bcrypt.compare(password, user.passwordHash);
    if (!validPassword) {
      return res.status(401).json({ error: "E-mail ou senha incorretos." });
    }

    const token = jwt.sign(
      { sub: user.id, email: user.email },
      process.env.JWT_SECRET || "dev_secret",
      { expiresIn: "7d" }
    );

    // Remove passwordHash da resposta
    const { passwordHash, ...userWithoutPassword } = user;

    return res.status(200).json({ token, user: userWithoutPassword });
  } catch (e: any) {
    console.error("POST /api/auth/login error:", e?.message || e);
    return res.status(500).json({ error: "Erro ao fazer login." });
  }
});

export default router;
