import { create } from 'zustand'
import { loginApi } from './loginApi'
import { useAuthStore } from '@features/auth/authStore'
export const useLoginStore = create((set) => ({
  user: null,
  token: '',
  loading: false,
  login: async ({ email, password }) => {
    try {
      set({ loading: true })
      const res = await loginApi({ email, password })
      const token = res.data.token
      // 상태에 저장
      useAuthStore.getState().login(token)
      set({ user: res.user, token: res.token })
      localStorage.setItem('token', res.token)
      return res
    } catch (err) {
      alert('로그인 실패: ' + err.message)
    } finally {
      set({ loading: false })
    }
  },
  logout: () => {
    set({ user: null, token: '' })
    localStorage.removeItem('token')
  },
}))