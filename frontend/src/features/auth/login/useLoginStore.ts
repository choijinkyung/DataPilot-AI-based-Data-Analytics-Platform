import { create } from 'zustand'
import { persist } from 'zustand/middleware';
import { loginApi,logoutApi,meApi } from './loginApi'

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
          const { user, token, refreshToken } = res.data;
          if (!refreshToken) {
            console.warn('⚠️ refreshToken이 응답에 포함되지 않았습니다.');
          }
          set({ user, token });
          localStorage.setItem('token', token);
          localStorage.setItem('refreshToken', refreshToken); // ✅ 저장

          return res;
        } catch (e: any) {
          if (e.response && e.response.data && e.response.data.message) {
            alert('로그인 실패: ' + e.response.data.message);
          } else {
            alert('로그인 실패: ' + e.message);
          }
        } finally {
          set({ loading: false });
        }
      },

      logout: async () => {
        await logoutApi();
        set({ user: null, token: '' });
        localStorage.removeItem('token');
        localStorage.removeItem('refreshToken'); // ✅ 삭제
      }
    }
  ))
);