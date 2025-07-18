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


export const useRegisterStore = create<AuthState>((set) => ({
    loading: false,
    error: null,
  
    register: async ({ email, password, name }) => {
      set({ loading: true, error: null });
      try {
        const body = JSON.stringify({ email, password, name });
        const res = await axios.post('/api/auth/register',body,{
          headers: {
            'Content-Type': 'application/json'
          }});  
   
        alert(res.data.message);
        // Reset the form or redirect to login page  
        set({ loading: false });
      } catch (err: any) {
        set({ loading: false, error: err.message });
      }
    },
  }));