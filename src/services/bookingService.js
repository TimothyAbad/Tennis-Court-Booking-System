import { api } from '../lib/api'

function toJs(row) {
  return {
    id: row.id,
    userId: row.user_id,
    courtId: row.court_id,
    courtName: row.court_name,
    date: row.date,
    startTime: row.start_time,
    endTime: row.end_time,
    guestName: row.guest_name,
    guestPhone: row.guest_phone,
    status: row.status,
    createdAt: row.created_at,
  }
}

function toDb(booking) {
  return {
    user_id: booking.userId,
    court_id: booking.courtId,
    court_name: booking.courtName,
    date: booking.date,
    start_time: booking.startTime,
    end_time: booking.endTime,
    guest_name: booking.guestName,
    guest_phone: booking.guestPhone,
    status: booking.status ?? 'confirmed',
  }
}

export const bookingService = {
  async getAll(authToken) {
    const rows = await api.get('/bookings?order=date.desc,start_time.desc', authToken)
    return (rows ?? []).map(toJs)
  },

  async getByCourtAndDate(courtId, date, authToken) {
    const rows = await api.get(
      `/bookings?court_id=eq.${courtId}&date=eq.${date}&status=eq.confirmed`,
      authToken
    )
    return (rows ?? []).map(toJs)
  },

  async create(data, authToken) {
    const rows = await api.post('/bookings', toDb(data), authToken)
    const row = Array.isArray(rows) ? rows[0] : rows
    return toJs(row)
  },

  async cancel(bookingId, authToken) {
    const rows = await api.patch(
      `/bookings?id=eq.${bookingId}`,
      { status: 'cancelled' },
      authToken
    )
    const row = Array.isArray(rows) ? rows[0] : rows
    return toJs(row)
  },
}
