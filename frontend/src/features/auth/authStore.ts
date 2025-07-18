import { create } from 'zustand'
import axios from 'axios'

export const useUserStore = create((set) => ({
  user: null,
  fetchUser: async () => {
    try {
      const token = localStorage.getItem('token')
      if (!token) throw new Error('No token')
      const res = await axios.get('http://localhost:4000/api/auth/me', {
        headers: {
          Authorization: `Bearer ${token}`,
        },
      })
      set({ user: res.data.user })
      return res.data.user
    } catch (e) {
      console.error('유저 정보를 가져오지 못했습니다.', e)
      throw e 
    }
  },
}))
