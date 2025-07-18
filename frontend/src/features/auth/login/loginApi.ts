import axios from 'axios'
import type {User} from '../../users/users.types'
import {useNavigate} from 'react-router-dom'

export const loginApi = async ({ email, password }) => {
  console.log('로그인 요청:', { email, password });
  const res = await axios.post('/api/auth/login', {
    email,
    password,
  }, {headers: {
    'Content-Type': 'application/json'
  }})
  console.log(res)
  return res
}


export const logoutApi = async () => {
  const router = useNavigate();
  const token = localStorage.getItem('token');
  if (!token) return;

  await axios.post('/api/auth/logout', {}, {
    headers: { Authorization: `Bearer ${token}` }
  });

  // ★ 저장된 토큰 제거
  localStorage.removeItem('token');
  router('/login')
};

export const meApi = async (): Promise<User | null> => {
  const token = localStorage.getItem('token');
  if (!token) return null;

  const { data } = await axios.get('/api/auth/me', {
    headers: { Authorization: `Bearer ${token}` }
  });
  return data.user;
};