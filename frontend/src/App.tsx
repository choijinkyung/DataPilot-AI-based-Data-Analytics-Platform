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
  const restore = useLoginStore((s) => s.restore);

  /** 첫 마운트 때 세션 복구 */
  useEffect(() => { restore(); }, []);

  return <RouterProvider router={router} />;
}

export default App;