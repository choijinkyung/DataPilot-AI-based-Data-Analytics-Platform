// src/components/ProtectedRoute.tsx
import { Navigate } from 'react-router-dom'
import {useLoginStore} from '@features/auth/login/useLoginStore'
import {useUserStore} from '@features/auth/authStore'
export default function ProtectedRoute({ children }: { children: JSX.Element }) {
  const token = useLoginStore(state => state.token);
  const user = useUserStore(state => state.user)
  if (!token) {
    return <Navigate to="/login" />;
  }
  if (!user) {
    return <div>Loading...</div> // 또는 로딩 UI
  }
  return children
}