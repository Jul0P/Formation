import { Navigate, Outlet } from 'react-router'

export default function ProtectedRoute() {
  const isAuthenticated = false // TODO: Remplacer par ton hook useAuth()

  if (!isAuthenticated) {
    return <Navigate to="/auth/login" replace />
  }

  return <Outlet />
}