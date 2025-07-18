import type { Request, Response, NextFunction } from 'express';
import jwt from 'jsonwebtoken';

export const authenticateToken = (req: Request, res: Response, next: NextFunction) => {
  const authHeader = req.headers['authorization'];
  const token = authHeader?.split(' ')[1];
  if (!token) return res.status(401).json({ message: 'No token provided' });

  try {
    const decoded = jwt.verify(token, process.env.JWT_SECRET || 'fallback-secret');
    req.user = decoded; // 타입 확장을 위해 custom.d.ts 참고
    next();
  } catch (err) {
    console.error('JWT verification error:', err);
    return res.status(401).json({ message: 'Invalid or expired token' });
  }
};