import prisma from '../../config/db.ts';
import type { RegisterInput } from './user.schema.ts';

export const createUser = async (data: RegisterInput) => {
  return await prisma.user.create({ data });
};