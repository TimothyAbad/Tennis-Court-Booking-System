import { BrowserRouter, Routes, Route, Navigate } from 'react-router-dom'
import { Layout } from './components/layout/Layout'
import { CourtsListPage } from './pages/CourtsListPage'
import { CourtDetailPage } from './pages/CourtDetailPage'
import { MyBookingsPage } from './pages/MyBookingsPage'

export default function App() {
  return (
    <BrowserRouter>
      <Routes>
        <Route path="/" element={<Layout />}>
          <Route index element={<Navigate to="/courts" replace />} />
          <Route path="courts" element={<CourtsListPage />} />
          <Route path="courts/:courtId" element={<CourtDetailPage />} />
          <Route path="bookings" element={<MyBookingsPage />} />
          <Route path="*" element={<Navigate to="/courts" replace />} />
        </Route>
      </Routes>
    </BrowserRouter>
  )
}
