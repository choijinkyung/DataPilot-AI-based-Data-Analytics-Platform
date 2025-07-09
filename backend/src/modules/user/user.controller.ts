import type { Request, Response } from 'express';
import { registerSchema } from './user.schema.ts';
import * as userService from './user.service.ts';

export const register = async (req: Request, res: Response) => {
  const parsed = registerSchema.safeParse(req.body);

  if (!parsed.success) {
    return res.status(400).json({ error: parsed.error.format() });
  }

  const user = await userService.createUser(parsed.data);
  return res.status(201).json(user);
};