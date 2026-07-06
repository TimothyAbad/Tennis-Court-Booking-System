import { useEffect } from 'react'
import { BookingForm } from './BookingForm'

export function BookingModal({ court, date, slot, onConfirm, onClose }) {
  useEffect(() => {
    const handler = (e) => { if (e.key === 'Escape') onClose() }
    document.addEventListener('keydown', handler)
    return () => document.removeEventListener('keydown', handler)
  }, [onClose])

  return (
    <div
      className="fixed inset-0 bg-black/50 flex items-center justify-center z-50 p-4"
      onClick={(e) => { if (e.target === e.currentTarget) onClose() }}
    >
      <div className="bg-white rounded-2xl shadow-xl w-full max-w-md p-6">
        <h2 className="text-lg font-semibold text-gray-900 mb-4">Confirm your booking</h2>
        <BookingForm
          court={court}
          date={date}
          slot={slot}
          onSubmit={onConfirm}
          onCancel={onClose}
        />
      </div>
    </div>
  )
}
