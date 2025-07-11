// pages/UsersPage.tsx
import React, { useEffect, useState } from 'react';
import { fetchUsers } from '../UsersApi';
import UsersContent from './UsersContent';
import type { User } from '../users.types';

export default function UsersPage() {
  const [users, setUsers] = useState<User[]>([]);
  useEffect(() => { fetchUsers().then(setUsers); }, []);
  return <UsersContent users={users} />;
}