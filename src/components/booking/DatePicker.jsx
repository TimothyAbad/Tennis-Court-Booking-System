export function DatePicker({ value, onChange }) {
  const today = new Date().toISOString().split('T')[0]

  return (
    <div>
      <label className="block text-sm font-medium text-gray-700 mb-1">Select Date</label>
      <input
        type="date"
        value={value}
        min={today}
        onChange={(e) => onChange(e.target.value)}
        className="block w-full border border-gray-300 rounded-lg px-3 py-2 text-sm focus:outline-none focus:ring-2 focus:ring-green-500 focus:border-green-500"
      />
    </div>
  )
}
