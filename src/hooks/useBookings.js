import { useState, useCallback } from 'react'
import { bookingService } from '../services/bookingService'

export function useBookings() {
  const [bookings, setBookings] = useState(() => bookingService.getAll())

  const createBooking = useCallback((data) => {
    const booking = bookingService.create(data)
    setBookings((prev) => [...prev, booking])
    return booking
  }, [])

  const cancelBooking = useCallback((bookingId) => {
    const updated = bookingService.cancel(bookingId)
    if (!updated) return
    setBookings((prev) => prev.map((b) => (b.id === bookingId ? updated : b)))
  }, [])

  const getBookingsForCourtAndDate = useCallback(
    (courtId, date) =>
      bookings.filter(
        (b) => b.courtId === courtId && b.date === date && b.status === 'confirmed'
      ),
    [bookings]
  )

  return { bookings, createBooking, cancelBooking, getBookingsForCourtAndDate }
}
