// src/routes/index.tsx
import React from 'react';
import type { RouteObject } from 'react-router';
import { RegisterPage } from '@features/register/RegisterPage';

export const routes: RouteObject[] = [
  {
    path: '/register',
    element: <RegisterPage />,
  },
  // 여기에 다른 페이지도 계속 추가 가능
];