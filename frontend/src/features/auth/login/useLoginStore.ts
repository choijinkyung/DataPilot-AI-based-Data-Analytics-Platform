import { create } from 'zustand'
import { persist } from 'zustand/middleware';
import { loginApi,logoutApi,meApi } from './loginApi'
import { useAuthStore } from '@features/auth/authStore'


export const useLoginStore = create<AuthState>()(
  persist(
    (set, get) => ({
      user: null,
      token: '',
      loading: false,

      login: async ({email, password}) => {
        try {
          set({ loading: true });        
          const res = await loginApi({ email, password });
          const { user, token } = res.data;
          set({ user, token });
          localStorage.setItem('token', token);
          return res;
        } catch (e: any) {
          alert('로그인 실패: ' + e.message);
        } finally {
          set({ loading: false });
        }
      },

      logout: async () => {
        await logoutApi();
        set({ user: null, token: '' });
      },

      restore: async () => {
        const token = localStorage.getItem('token');
        if (!token || token.length === 0) {
          set({ loading: false, token: '' });   // ← token도 빈 값으로 초기화
          return;
        }
        set({ loading: true, token });
        try {
          const user = await meApi();
          if (user) set({ user });
          else localStorage.removeItem('token');
        } finally {
          set({ loading: false });
        }
      },
    }),
    { name: 'auth-storage' }
  )
);