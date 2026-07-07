import { useState, useEffect, useCallback } from 'react'
import { authClient, getJwt } from '../lib/auth'
import { bookingService } from '../services/bookingService'

export function useBookings() {
  const { data: session } = authClient.useSession()
  const userId = session?.user?.id

  const [bookings, setBookings] = useState([])
  const [loading, setLoading] = useState(true)
  const [error, setError] = useState(null)

  useEffect(() => {
    if (!session) { setLoading(false); return }
    setLoading(true)
    getJwt()
      .then(token => bookingService.getAll(token))
      .then(setBookings)
      .catch(setError)
      .finally(() => setLoading(false))
  }, [session])

  const createBooking = useCallback(async (data) => {
    const token = await getJwt()
    const booking = await bookingService.create({ ...data, userId }, token)
    setBookings(prev => [...prev, booking])
    return booking
  }, [userId])

  const cancelBooking = useCallback(async (bookingId) => {
    const token = await getJwt()
    const updated = await bookingService.cancel(bookingId, token)
    if (updated) setBookings(prev => prev.map(b => b.id === bookingId ? updated : b))
  }, [])

  const getBookingsForCourtAndDate = useCallback(
    (courtId, date) =>
      bookings.filter(b => b.courtId === courtId && b.date === date && b.status === 'confirmed'),
    [bookings]
  )

  return { bookings, loading, error, createBooking, cancelBooking, getBookingsForCourtAndDate }
}
