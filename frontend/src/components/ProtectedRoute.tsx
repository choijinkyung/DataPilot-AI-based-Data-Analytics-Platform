// src/components/ProtectedRoute.tsx
import { Navigate } from 'react-router-dom'
import {useLoginStore} from '@features/auth/login/useLoginStore'

export default function ProtectedRoute({ children }: { children: JSX.Element }) {
  const token = useLoginStore(state => state.token);

  if (!token) {
    return <Navigate to="/login" />;
  }
  return children
}