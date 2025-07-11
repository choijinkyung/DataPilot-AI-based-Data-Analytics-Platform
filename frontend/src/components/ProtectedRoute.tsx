// src/components/ProtectedRoute.tsx
import { Navigate } from 'react-router-dom'
import { useAuthStore } from '@features/auth/authStore'

export default function ProtectedRoute({ children }: { children: JSX.Element }) {
  const { isLoggedIn } = useAuthStore()

  if (!isLoggedIn) {
    return <Navigate to="/login" replace />
  }

  return children
}