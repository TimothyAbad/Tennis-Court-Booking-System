import { useState } from 'react'
import { useParams, Link, useNavigate } from 'react-router-dom'
import { useCourts } from '../hooks/useCourts'
import { useBookings } from '../hooks/useBookings'
import { DatePicker } from '../components/booking/DatePicker'
import { TimeSlotGrid } from '../components/booking/TimeSlotGrid'
import { BookingModal } from '../components/booking/BookingModal'
import { CourtBadge } from '../components/courts/CourtBadge'

const surfaceBg = { Hard: 'bg-blue-100', Clay: 'bg-orange-100', Grass: 'bg-green-100' }
const surfaceIcon = { Hard: '🏟️', Clay: '🟫', Grass: '🌿' }

export function CourtDetailPage() {
  const { courtId } = useParams()
  const navigate = useNavigate()
  const { courts } = useCourts()
  const { createBooking, getBookingsForCourtAndDate } = useBookings()

  const today = new Date().toISOString().split('T')[0]
  const [date, setDate] = useState(today)
  const [selectedSlot, setSelectedSlot] = useState(null)
  const [showModal, setShowModal] = useState(false)
  const [confirmation, setConfirmation] = useState(null)
  const [bookingError, setBookingError] = useState(null)

  const court = courts.find((c) => c.id === courtId)
  if (!court) {
    return (
      <div className="text-center py-16">
        <p className="text-gray-500">Court not found.</p>
        <Link to="/courts" className="text-green-600 hover:underline text-sm mt-2 inline-block">← Back to courts</Link>
      </div>
    )
  }

  const bookedSlots = getBookingsForCourtAndDate(courtId, date)

  function handleSlotSelect(slot) {
    setSelectedSlot(slot)
    setShowModal(true)
    setConfirmation(null)
    setBookingError(null)
  }

  async function handleConfirm(guestData) {
    try {
      const booking = await createBooking({
        courtId: court.id,
        courtName: court.name,
        date,
        startTime: selectedSlot.startTime,
        endTime: selectedSlot.endTime,
        ...guestData,
      })
      setShowModal(false)
      setConfirmation(booking)
      setSelectedSlot(null)
    } catch (err) {
      setBookingError(err.message || 'Failed to save booking. Please try again.')
      console.error(err)
    }
  }

  return (
    <div>
      <Link to="/courts" className="text-sm text-green-600 hover:underline inline-flex items-center gap-1 mb-4">
        ← All courts
      </Link>

      <div className="bg-white rounded-xl border border-gray-200 overflow-hidden mb-6">
        <div className={`h-40 flex items-center justify-center ${surfaceBg[court.surface] ?? 'bg-gray-100'}`}>
          <span className="text-6xl">{surfaceIcon[court.surface] ?? '🎾'}</span>
        </div>
        <div className="p-5">
          <div className="flex items-start justify-between gap-3 mb-2">
            <h1 className="text-xl font-bold text-gray-900">{court.name}</h1>
            <span className="text-lg font-semibold text-gray-700 shrink-0">${court.pricePerHour}/hr</span>
          </div>
          <CourtBadge surface={court.surface} type={court.type} />
          <p className="mt-2 text-sm text-gray-600">{court.description}</p>
        </div>
      </div>

      {confirmation && (
        <div className="mb-6 bg-green-50 border border-green-300 rounded-xl p-4 flex items-start gap-3">
          <span className="text-2xl">✅</span>
          <div>
            <p className="font-semibold text-green-900">Booking confirmed!</p>
            <p className="text-sm text-green-700">
              {court.name} · {confirmation.startTime} – {confirmation.endTime} on{' '}
              {new Date(date + 'T00:00:00').toLocaleDateString('en-AU', { weekday: 'short', month: 'short', day: 'numeric' })}
            </p>
            <button
              onClick={() => navigate('/bookings')}
              className="text-sm text-green-700 hover:underline mt-1 font-medium"
            >
              View my bookings →
            </button>
          </div>
        </div>
      )}

      {bookingError && (
        <div className="mb-4 bg-red-50 border border-red-200 rounded-lg p-3 text-sm text-red-700">
          {bookingError}
        </div>
      )}

      <div className="bg-white rounded-xl border border-gray-200 p-5 space-y-5">
        <DatePicker value={date} onChange={(d) => { setDate(d); setSelectedSlot(null); setConfirmation(null) }} />
        <TimeSlotGrid
          bookedSlots={bookedSlots}
          selectedSlot={selectedSlot}
          onSelect={handleSlotSelect}
        />
      </div>

      {showModal && selectedSlot && (
        <BookingModal
          court={court}
          date={date}
          slot={selectedSlot}
          onConfirm={handleConfirm}
          onClose={() => { setShowModal(false); setSelectedSlot(null) }}
        />
      )}
    </div>
  )
}
