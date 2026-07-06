import { Link } from 'react-router-dom'
import { useBookings } from '../hooks/useBookings'
import { Button } from '../components/shared/Button'
import { EmptyState } from '../components/shared/EmptyState'
import { Badge } from '../components/shared/Badge'

function formatDate(dateStr) {
  return new Date(dateStr + 'T00:00:00').toLocaleDateString('en-AU', {
    weekday: 'short', year: 'numeric', month: 'short', day: 'numeric',
  })
}

function formatTime(start, end) {
  const fmt = (t) => {
    const [h] = t.split(':').map(Number)
    return `${h > 12 ? h - 12 : h}:00 ${h >= 12 ? 'PM' : 'AM'}`
  }
  return `${fmt(start)} – ${fmt(end)}`
}

export function MyBookingsPage() {
  const { bookings, cancelBooking } = useBookings()

  const sorted = [...bookings].sort((a, b) => {
    if (a.date !== b.date) return b.date.localeCompare(a.date)
    return b.startTime.localeCompare(a.startTime)
  })

  const confirmed = sorted.filter((b) => b.status === 'confirmed')
  const cancelled = sorted.filter((b) => b.status === 'cancelled')

  if (sorted.length === 0) {
    return (
      <EmptyState
        icon="📅"
        title="No bookings yet"
        description="Browse courts and book a time slot to get started."
        action={<Link to="/courts"><Button variant="primary">Browse Courts</Button></Link>}
      />
    )
  }

  return (
    <div>
      <h1 className="text-2xl font-bold text-gray-900 mb-6">My Bookings</h1>

      {confirmed.length > 0 && (
        <section className="mb-8">
          <h2 className="text-sm font-semibold text-gray-500 uppercase tracking-wide mb-3">Upcoming</h2>
          <div className="space-y-3">
            {confirmed.map((b) => (
              <BookingRow key={b.id} booking={b} onCancel={cancelBooking} />
            ))}
          </div>
        </section>
      )}

      {cancelled.length > 0 && (
        <section>
          <h2 className="text-sm font-semibold text-gray-500 uppercase tracking-wide mb-3">Cancelled</h2>
          <div className="space-y-3 opacity-60">
            {cancelled.map((b) => (
              <BookingRow key={b.id} booking={b} />
            ))}
          </div>
        </section>
      )}
    </div>
  )
}

function BookingRow({ booking, onCancel }) {
  const isPast = booking.date < new Date().toISOString().split('T')[0]

  return (
    <div className="bg-white rounded-xl border border-gray-200 p-4 flex items-center justify-between gap-4">
      <div className="min-w-0">
        <div className="flex items-center gap-2 mb-1 flex-wrap">
          <span className="font-semibold text-gray-900">{booking.courtName}</span>
          {booking.status === 'cancelled' && <Badge color="red">Cancelled</Badge>}
          {booking.status === 'confirmed' && isPast && <Badge color="gray">Past</Badge>}
        </div>
        <p className="text-sm text-gray-600">{formatDate(booking.date)} · {formatTime(booking.startTime, booking.endTime)}</p>
        <p className="text-sm text-gray-500">{booking.guestName}</p>
      </div>
      {onCancel && booking.status === 'confirmed' && !isPast && (
        <Button
          variant="danger"
          className="shrink-0"
          onClick={() => {
            if (confirm('Cancel this booking?')) onCancel(booking.id)
          }}
        >
          Cancel
        </Button>
      )}
    </div>
  )
}
