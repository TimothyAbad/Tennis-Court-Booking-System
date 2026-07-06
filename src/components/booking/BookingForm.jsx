import { useState } from 'react'
import { Button } from '../shared/Button'

export function BookingForm({ onSubmit, onCancel, court, date, slot }) {
  const [name, setName] = useState('')
  const [phone, setPhone] = useState('')
  const [errors, setErrors] = useState({})

  function validate() {
    const e = {}
    if (!name.trim()) e.name = 'Name is required'
    if (!phone.trim()) e.phone = 'Phone number is required'
    return e
  }

  function handleSubmit(ev) {
    ev.preventDefault()
    const e = validate()
    if (Object.keys(e).length) { setErrors(e); return }
    onSubmit({ guestName: name.trim(), guestPhone: phone.trim() })
  }

  const formatDate = (d) =>
    new Date(d + 'T00:00:00').toLocaleDateString('en-AU', {
      weekday: 'long', year: 'numeric', month: 'long', day: 'numeric',
    })

  return (
    <form onSubmit={handleSubmit} className="space-y-4">
      <div className="bg-green-50 border border-green-200 rounded-lg p-3 text-sm">
        <p className="font-medium text-green-900">{court.name}</p>
        <p className="text-green-700">{formatDate(date)} · {slot.label}–{slot.endTime.replace(/(\d+):00/, (_, h) => `${Number(h) > 12 ? Number(h) - 12 : Number(h)}:00 ${Number(h) >= 12 ? 'PM' : 'AM'}`)}</p>
        <p className="text-green-700">${court.pricePerHour} total</p>
      </div>

      <div>
        <label className="block text-sm font-medium text-gray-700 mb-1">Your Name</label>
        <input
          type="text"
          value={name}
          onChange={(e) => { setName(e.target.value); setErrors((p) => ({ ...p, name: undefined })) }}
          placeholder="Jane Smith"
          className={`block w-full border rounded-lg px-3 py-2 text-sm focus:outline-none focus:ring-2 focus:ring-green-500 ${errors.name ? 'border-red-400' : 'border-gray-300'}`}
        />
        {errors.name && <p className="text-red-500 text-xs mt-1">{errors.name}</p>}
      </div>

      <div>
        <label className="block text-sm font-medium text-gray-700 mb-1">Phone Number</label>
        <input
          type="tel"
          value={phone}
          onChange={(e) => { setPhone(e.target.value); setErrors((p) => ({ ...p, phone: undefined })) }}
          placeholder="0412 345 678"
          className={`block w-full border rounded-lg px-3 py-2 text-sm focus:outline-none focus:ring-2 focus:ring-green-500 ${errors.phone ? 'border-red-400' : 'border-gray-300'}`}
        />
        {errors.phone && <p className="text-red-500 text-xs mt-1">{errors.phone}</p>}
      </div>

      <div className="flex gap-3 pt-1">
        <Button type="button" variant="secondary" onClick={onCancel} className="flex-1">Cancel</Button>
        <Button type="submit" variant="primary" className="flex-1">Confirm Booking</Button>
      </div>
    </form>
  )
}
