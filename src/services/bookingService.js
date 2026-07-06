const STORAGE_KEY = 'tennis_bookings'

function load() {
  try {
    return JSON.parse(localStorage.getItem(STORAGE_KEY)) ?? []
  } catch {
    return []
  }
}

function save(bookings) {
  localStorage.setItem(STORAGE_KEY, JSON.stringify(bookings))
}

export const bookingService = {
  getAll() {
    return load()
  },

  getByCourtAndDate(courtId, date) {
    return load().filter(
      (b) => b.courtId === courtId && b.date === date && b.status === 'confirmed'
    )
  },

  create(data) {
    const booking = {
      id: crypto.randomUUID(),
      ...data,
      status: 'confirmed',
      createdAt: new Date().toISOString(),
    }
    const bookings = load()
    bookings.push(booking)
    save(bookings)
    return booking
  },

  cancel(bookingId) {
    const bookings = load()
    const idx = bookings.findIndex((b) => b.id === bookingId)
    if (idx === -1) return null
    bookings[idx] = { ...bookings[idx], status: 'cancelled' }
    save(bookings)
    return bookings[idx]
  },
}
