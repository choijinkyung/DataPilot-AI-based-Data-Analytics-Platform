import prisma from '../../config/db.ts';
import type { RegisterInput,LoginInput} from './auth.schema.ts';

export const createUser = async (data: RegisterInput) => {
  return await prisma.user.create({ data });
};

export const findUserByEmail = async (data) => {
    if (!data.email) {
        throw new Error('Email is required');
      }

  return await prisma.user.findUnique({
    where: {
      email: data.email,
    },
  });
};  

export const findUserById = async (id: string) =>
  prisma.user.findUnique({ where: { id } });