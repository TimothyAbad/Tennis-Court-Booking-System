const SLOTS = Array.from({ length: 14 }, (_, i) => {
  const hour = 7 + i
  const pad = (n) => String(n).padStart(2, '0')
  return {
    startTime: `${pad(hour)}:00`,
    endTime: `${pad(hour + 1)}:00`,
    label: `${hour > 12 ? hour - 12 : hour}:00 ${hour >= 12 ? 'PM' : 'AM'}`,
  }
})

export function TimeSlotGrid({ bookedSlots, selectedSlot, onSelect }) {
  const bookedStartTimes = new Set(bookedSlots.map((b) => b.startTime))

  return (
    <div>
      <label className="block text-sm font-medium text-gray-700 mb-2">Select Time</label>
      <div className="grid grid-cols-2 sm:grid-cols-3 md:grid-cols-4 gap-2">
        {SLOTS.map((slot) => {
          const booked = bookedStartTimes.has(slot.startTime)
          const selected = selectedSlot?.startTime === slot.startTime
          return (
            <button
              key={slot.startTime}
              disabled={booked}
              onClick={() => onSelect(slot)}
              className={`px-3 py-2.5 rounded-lg text-sm font-medium border transition-colors text-center
                ${booked
                  ? 'bg-gray-100 text-gray-400 border-gray-200 cursor-not-allowed line-through'
                  : selected
                  ? 'bg-green-600 text-white border-green-600'
                  : 'bg-white text-gray-700 border-gray-300 hover:border-green-400 hover:bg-green-50'
                }`}
            >
              {slot.label}
              {booked && <span className="block text-xs">Booked</span>}
            </button>
          )
        })}
      </div>
    </div>
  )
}
