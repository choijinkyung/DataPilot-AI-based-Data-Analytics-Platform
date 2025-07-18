// src/App.tsx
import React,{useEffect} from 'react';
import {
  createBrowserRouter,
  RouterProvider,
} from 'react-router-dom';
import { routes } from './routes';
import {useLoginStore} from './features/auth/login/useLoginStore';

const router = createBrowserRouter(routes);

function App() {
  return <RouterProvider router={router} />;
}

export default App;