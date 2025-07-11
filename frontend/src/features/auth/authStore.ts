import { create } from 'zustand'
import axios from 'axios'

export const useUserStore = create((set) => ({
  user: null,
  fetchUser: async () => {
    try {
      const token = localStorage.getItem('token')
      const res = await axios.get('http://localhost:4000/api/user/me', {
        headers: {
          Authorization: `Bearer ${token}`,
        },
      })
      set({ user: res.data.user })
    } catch (e) {
      console.error('유저 정보를 가져오지 못했습니다.', e)
    }
  },
}))

type AuthState = {
    token: string | null
    isLoggedIn: boolean
    login: (token: string) => void
    logout: () => void
  }
  
  export const useAuthStore = create<AuthState>((set) => ({
    token: localStorage.getItem('token'),
    isLoggedIn: !!localStorage.getItem('token'),
    login: (token: string) => {
      localStorage.setItem('token', token)
      set({ token, isLoggedIn: true })
    },
    logout: () => {
      localStorage.removeItem('token')
      set({ token: null, isLoggedIn: false })
    },
  }))