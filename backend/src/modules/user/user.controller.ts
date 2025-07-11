import type { Request, Response } from 'express';
import { registerSchema } from './user.schema.ts';
import bcrypt from 'bcrypt';
import jwt from 'jsonwebtoken';
import * as userService from './user.service.ts';
import dotenv from 'dotenv';
dotenv.config();

export const register = async (req: Request, res: Response) => {
  const parsed = registerSchema.safeParse(req.body);

  if (!parsed.success) {
    return res.status(400).json({ error: parsed.error.format() });
  }

  const user = await userService.createUser(parsed.data);
  return res.status(201).json(user);
};

export const login = async (req: Request, res: Response) => {
  // 로그인 로직 구현

    const { email, password } = req.body;
    console.log('로그인 요청:', { email, password });
    try {
        const user = await userService.findUserByEmail({ email, password });
    
        if (!user) {
          return res.status(401).json({ message: 'Invalid email or password' });
        }
    
    const passwordMatch = user.password ===password;
    if (!passwordMatch) {
      return res.status(401).json({ message: 'Invalid email or password' });
    }

    const token = jwt.sign(
      { userId: user.id, email: user.email },
      process.env.JWT_SECRET || 'fallback-secret',
      { expiresIn: '1h' }
    );

    return res.status(200).json({
      message: 'Login successful',
      token,
      user: {
        id: user.id,
        name: user.name,
        email: user.email,
      },
    });
  } catch (err) {
    console.error('Login error:', err);
    return res.status(500).json({ message: 'Internal server error' });
  }
}   