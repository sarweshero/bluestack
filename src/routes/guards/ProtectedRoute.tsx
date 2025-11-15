import { Navigate } from 'react-router-dom'
import type { ReactElement } from 'react'

interface ProtectedRouteProps {
  isAllowed: boolean
  redirectPath: string
  children: ReactElement
}

const ProtectedRoute = ({ isAllowed, redirectPath, children }: ProtectedRouteProps) => {
  if (!isAllowed) {
    return <Navigate to={redirectPath} replace />
  }

  return children
}

export default ProtectedRoute
