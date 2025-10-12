import { Request, Response, NextFunction } from 'express';
import jwt from 'jsonwebtoken';

export interface AuthRequest extends Request {
  userId?: number;
}

export const authMiddleware = (req: AuthRequest, res: Response, next: NextFunction) => {
  try {
    const token = req.header('Authorization')?.replace('Bearer ', '');
    
    console.log('🔐 Token recebido:', token); // DEBUG
    
    if (!token) {
      return res.status(401).json({ error: 'Token não fornecido' });
    }

    const decoded = jwt.verify(token, process.env.JWT_SECRET!) as unknown as { sub: number }; // MUDA AQUI
    console.log('🔓 Token decodificado:', decoded); // DEBUG
    
    req.userId = decoded.sub; // MUDA AQUI (de userId para sub)
    console.log('✅ User ID:', req.userId); // DEBUG
    
    next();
  } catch (error) {
    console.error('❌ Erro no token:', error); // DEBUG
    res.status(401).json({ error: 'Token inválido' });
  }
};
