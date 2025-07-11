// pages/ProfilePage.tsx
import React, { useEffect, useState } from 'react';
import { fetchLogs } from '../UsersApi';
import ProfileContent from './ProfileContent';
import { useNavigate } from 'react-router-dom';
import type { User } from '../users.types';
import { useLoginStore } from '../../auth/login/useLoginStore';

export default function ProfilePage() {
  const { user, logout, loading } = useLoginStore();
  const nav = useNavigate();
  const [logs, setLogs] = useState([]);

  /** 유저 정보가 준비되면 로그 조회 */
  useEffect(() => {
    if (!user) return;
    (async () => {
      setLogs(await fetchLogs(user.id));
    })();
  }, [user]);


  if (loading) return <p>로딩 중…</p>;
  if (!user)   return nav('/login');

  console.log('user', user);
  return <ProfileContent me={user} logs={logs} onLogout={async () => { await logout(); nav('/login'); }} />;
}