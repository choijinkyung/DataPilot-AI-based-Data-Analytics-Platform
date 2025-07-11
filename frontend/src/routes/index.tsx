// src/routes/index.tsx
import React from 'react';
import type { RouteObject } from 'react-router';
import ProtectedRoute from '@/components/ProtectedRoute'
import { RegisterPage } from '@features/auth/register/RegisterPage';
import  LoginPage  from '@features/auth/login/LoginPage';
import  HomePage  from '@features/home/HomePage';
export const routes: RouteObject[] = [
  {
    path: '/',
    element: <ProtectedRoute>
              <HomePage />
            </ProtectedRoute>
  },

  {
    path: '/register',
    element: <RegisterPage />,
  },
  {path:'/login',
    element:<LoginPage />, // LoginPage 컴포넌트는 별도로 구현해야 합니다.
  }
  // 여기에 다른 페이지도 계속 추가 가능
];