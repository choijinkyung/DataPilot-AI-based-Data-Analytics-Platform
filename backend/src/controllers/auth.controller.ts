import type { Request, Response } from 'express';

export const register = (req: Request, res: Response) => {
  const { email, password } = req.body;
  // TODO: 실제 사용자 생성 로직
  res.status(201).json({ message: 'User registered successfully', email });
};