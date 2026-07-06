import { Link } from 'react-router-dom'
import { CourtBadge } from './CourtBadge'

const surfaceBg = { Hard: 'bg-blue-100', Clay: 'bg-orange-100', Grass: 'bg-green-100' }
const surfaceIcon = { Hard: '🏟️', Clay: '🟫', Grass: '🌿' }

export function CourtCard({ court }) {
  return (
    <Link
      to={`/courts/${court.id}`}
      className="block bg-white rounded-xl border border-gray-200 overflow-hidden hover:shadow-md hover:border-green-300 transition-all group"
    >
      <div className={`h-36 flex items-center justify-center ${surfaceBg[court.surface] ?? 'bg-gray-100'}`}>
        <span className="text-5xl">{surfaceIcon[court.surface] ?? '🎾'}</span>
      </div>
      <div className="p-4">
        <div className="flex items-start justify-between gap-2 mb-2">
          <h3 className="font-semibold text-gray-900 group-hover:text-green-700 transition-colors">
            {court.name}
          </h3>
          <span className="text-sm font-medium text-gray-500 shrink-0">${court.pricePerHour}/hr</span>
        </div>
        <CourtBadge surface={court.surface} type={court.type} />
        <p className="mt-2 text-sm text-gray-500 line-clamp-2">{court.description}</p>
      </div>
    </Link>
  )
}
