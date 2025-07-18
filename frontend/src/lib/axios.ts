import axios from 'axios';
import { useLoginStore } from '@features/auth/useLoginStore';

const instance = axios.create({
  baseURL: import.meta.env.VITE_API_BASE_URL || 'http://localhost:3000',
});

instance.interceptors.request.use((config) => {
  const token = useLoginStore.getState().token;
  if (token) {
    config.headers.Authorization = `Bearer ${token}`;
  }
  return config;
});

let isRefreshing = false;

instance.interceptors.response.use(
  res => res,
  async (error) => {
    const originalRequest = error.config;

    if (error.response?.status === 401 && !originalRequest._retry) {
      originalRequest._retry = true;

      if (isRefreshing) return Promise.reject(error);
      isRefreshing = true;

      try {
        const res = await axios.post('/auth/refresh', {
          refreshToken: localStorage.getItem('refreshToken'),
        });

        const newToken = res.data.token;
        useLoginStore.getState().login({ token: newToken, user: null }); // 상태 갱신
        originalRequest.headers['Authorization'] = `Bearer ${newToken}`;
        return instance(originalRequest);
      } catch (e) {
        useLoginStore.getState().logout();
        return Promise.reject(e);
      } finally {
        isRefreshing = false;
      }
    }

    return Promise.reject(error);
  }
);

export default instance;