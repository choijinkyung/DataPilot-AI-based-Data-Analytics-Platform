import { create } from 'zustand';
import axios from 'axios';

interface UserState {
  name: string;
  setName: (name: string) => void;
}

export const useUserStore = create<UserState>((set) => ({
  name: '',
  setName: (name) => set({ name }),
}));


interface AuthState {
    loading: boolean;
    error: string | null;
    register: (user: { email: string; password: string; name: string }) => Promise<void>;
  }


export const useAuthStore = create<AuthState>((set) => ({
    loading: false,
    error: null,
  
    register: async ({ email, password, name }) => {
      set({ loading: true, error: null });
      try {
        const body = JSON.stringify({ email, password, name });
        const res = await axios.post('/api/users/register',body,{
          headers: {
            'Content-Type': 'application/json'
          }});
  
        if (!res.ok) {
          const data = await res.json();
          
          throw new Error(data.message || '회원가입 실패');
        }
        alert('회원가입이 완료되었습니다. 로그인해주세요.');
        // Reset the form or redirect to login page
  
        set({ loading: false });
      } catch (err: any) {
        set({ loading: false, error: err.message });
      }
    },
  }));