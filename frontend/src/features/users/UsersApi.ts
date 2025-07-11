// features/users/api/users.ts
import type { User, Log } from './users.types';

export const fetchUsers = async (): Promise<User[]> =>
  new Promise(r => setTimeout(() =>
    r([
      { id: '1', name: 'Eden',  email: 'admin@site.com', role: 'admin' },
      { id: '2', name: 'Alex',  email: 'alex@site.com',  role: 'user'  }
    ]), 400));

export const fetchLogs = async (userId: string): Promise<Log[]> =>
  new Promise(r => setTimeout(() =>
    r([
      { id: 'l1', userId, action: '로그인',    at: '2025-07-11 14:00' },
      { id: 'l2', userId, action: '프로필 수정', at: '2025-07-11 15:10' }
    ]), 400));