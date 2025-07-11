import axios from 'axios'
import type {User} from '../../users/users.types'

export const loginApi = async ({ email, password }) => {
  console.log('로그인 요청:', { email, password });
  const res = await axios.post('/api/users/login', {
    email,
    password,
  }, {headers: {
    'Content-Type': 'application/json'
  }})
  console.log(res)
  return res
}


export const logoutApi = async () => {
  const token = localStorage.getItem('token');
  if (!token) return;

  await axios.post('/api/users/logout', {}, {
    headers: { Authorization: `Bearer ${token}` }
  });

  // ★ 저장된 토큰 제거
  localStorage.removeItem('token');
};

export const meApi = async (): Promise<User | null> => {
  const token = localStorage.getItem('token');
  if (!token) return null;

  const { data } = await axios.get('/api/users/me', {
    headers: { Authorization: `Bearer ${token}` }
  });
  return data.user;
};