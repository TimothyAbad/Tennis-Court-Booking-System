import { Navigate } from 'react-router-dom'
import { authClient } from '../../lib/auth'

export function ProtectedRoute({ children }) {
  const { data: session, isPending } = authClient.useSession()
  if (isPending) return null
  if (!session) return <Navigate to="/sign-in" replace />
  return children
}
