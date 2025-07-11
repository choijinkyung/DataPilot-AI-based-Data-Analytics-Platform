// src/routes/index.tsx
import React from 'react';
import type { RouteObject } from 'react-router';
import Layout from '@/components/Layout';
import ProtectedRoute from '@/components/ProtectedRoute'
import { RegisterPage } from '@features/auth/register/RegisterPage';
import  LoginPage  from '@features/auth/login/LoginPage';
import  HomePage  from '@features/home/HomePage';
import UploadPage  from '@features/upload/UploadPage';
import AnalyzePage  from '@features/analyze/AnalyzePage';
import ResultsPage  from '@features/results/ResultsPage';
// import UserPage  from '@features/user/UserPage';

export const routes: RouteObject[] = [
  /* ─────────── 인증이 필요한 영역 ─────────── */
  {
    // ① "/" 이하 모든 URL은 먼저 ProtectedRoute로 인증 검사
    element: (
      <ProtectedRoute>
        <Layout />          {/* 네비·사이드바 포함 공통 레이아웃 */}
      </ProtectedRoute>
    ),
    children: [
      { index: true,  element: <HomePage /> },   // == path: ''
      { path: 'upload',  element: <UploadPage /> },
      { path: 'analyze', element: <AnalyzePage /> },
      { path: 'results', element: <ResultsPage /> },
      // { path: 'user',    element: <UserPage /> },
    ],
  },

  /* ─────────── 인증 없이 접근하는 페이지 ─────────── */
  { path: '/login',    element: <LoginPage /> },
  { path: '/register', element: <RegisterPage /> },

  /* ─────────── 존재하지 않는 경로 처리(선택) ─────────── */
  // { path: '*', element: <NotFoundPage /> },
];