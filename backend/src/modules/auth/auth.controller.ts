import type { Request, Response } from 'express';
import { registerSchema } from './auth.schema.ts';
import bcrypt from 'bcrypt';
import jwt from 'jsonwebtoken';
import * as authService from './auth.service.ts';
import dotenv from 'dotenv';
dotenv.config();

export const register = async (req: Request, res: Response) => {
  const parsed = registerSchema.safeParse(req.body);

  if (!parsed.success) {
    return res.status(400).json({ error: parsed.error.format() });
  }

  const user = await authService.createUser(parsed.data);
  return res.status(201).json({message:'Register Successfull!'});
};

export const login = async (req: Request, res: Response) => {
  // 로그인 로직 구현

    const { email, password } = req.body;
    console.log('로그인 요청:', { email, password });
    try {
        const user = await authService.findUserByEmail({ email, password });
    
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
    const refreshToken = jwt.sign(
      { userId: user.id },
      process.env.REFRESH_SECRET,
      { expiresIn: '7d' }
    );
    return res.status(200).json({
      message: 'Login successful',
      token,
      refreshToken,
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


export const logout = async (req: Request, res: Response) => {
  try {
    // 1) Authorization: Bearer xxx 받아오기
    const auth = req.headers.authorization;
    if (!auth) return res.status(400).json({ message: 'No token provided' });

    const token = auth.split(' ')[1];

    // 2) (선택) 토큰 유효성 확인
    const decoded: any = jwt.verify(token, process.env.JWT_SECRET || 'fallback-secret');

    // // 3) 블랙리스트 저장 – 1시간 후 만료
    // await redisClient.setEx(`bl_${token}`, 3600, 'logout');

    // 4) 클라이언트 쿠키 방식이면 res.clearCookie('token');
    return res.status(200).json({ message: 'Logout successful' });
  } catch (err) {
    console.error('Logout error:', err);
    return res.status(401).json({ message: 'Invalid token' });
  }
};

export const me = async (req: Request, res: Response) => {
  try {
    const auth = req.headers.authorization;
    if (!auth) return res.status(401).json({ message: 'No token' });

    const token = auth.split(' ')[1];
    const decoded: any = jwt.verify(token, process.env.JWT_SECRET || 'fallback-secret');

    const user = await authService.findUserByEmail(decoded);

    if (!user) return res.status(404).json({ message: 'User not found' });
    return res.status(200).json({ user });
  } catch (err) {
    console.error('me error:', err);
    return res.status(401).json({ message: 'Invalid token' });
  }
};

export const refresh=async(req:Request, res:Response)=>{
  const { refreshToken } = req.body;
  if (!refreshToken) return res.sendStatus(401);

  try{
    const decoded = jwt.verify(refreshToken, process.env.REFRESH_SECRET);
    const newToken = jwt.sign({ userId: decoded.userId }, process.env.JWT_SECRET, { expiresIn: '1h' });

    return res.json({ token: newToken });
  }catch(err){
    return res.status(403).json({ message: 'Invalid refresh token' });
  }
}