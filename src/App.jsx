import { BrowserRouter, Routes, Route, Navigate } from 'react-router-dom'
import { Layout } from './components/layout/Layout'
import { ProtectedRoute } from './components/auth/ProtectedRoute'
import { CourtsListPage } from './pages/CourtsListPage'
import { CourtDetailPage } from './pages/CourtDetailPage'
import { MyBookingsPage } from './pages/MyBookingsPage'
import { SignInPage } from './pages/SignInPage'

export default function App() {
  return (
    <BrowserRouter>
      <Routes>
        <Route path="/" element={<Layout />}>
          <Route index element={<Navigate to="/courts" replace />} />
          <Route path="sign-in" element={<SignInPage />} />
          <Route path="courts" element={<ProtectedRoute><CourtsListPage /></ProtectedRoute>} />
          <Route path="courts/:courtId" element={<ProtectedRoute><CourtDetailPage /></ProtectedRoute>} />
          <Route path="bookings" element={<ProtectedRoute><MyBookingsPage /></ProtectedRoute>} />
          <Route path="*" element={<Navigate to="/courts" replace />} />
        </Route>
      </Routes>
    </BrowserRouter>
  )
}
