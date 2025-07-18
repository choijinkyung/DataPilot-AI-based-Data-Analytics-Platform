// src/App.tsx
import React,{useEffect} from 'react';
import {
  createBrowserRouter,
  RouterProvider,
} from 'react-router-dom';
import { routes } from './routes';
import {useLoginStore} from './features/auth/login/useLoginStore';
import {useUserStore} from './features/auth/authStore'

const router = createBrowserRouter(routes);

function App() {
  const token = useLoginStore(state => state.token)
  const logout = useLoginStore(state => state.logout)
  const fetchUser = useUserStore(state => state.fetchUser)
  
  useEffect(() => {
    if (!token) return // 토큰 없으면 패스
    
    // 토큰 유효성 확인 및 유저정보 fetch
    const verifyToken = async () => {
      try {
        await fetchUser() // 유저정보 API 호출 시 토큰 검사됨
      } catch (error) {
        // 토큰이 DB에 없거나 만료되었을 때 fetchUser에서 에러 발생하면 로그아웃 처리
        logout()
      }
    }
    
    verifyToken()
  }, [token, fetchUser, logout])
  return <RouterProvider router={router} />;
}

export default App;