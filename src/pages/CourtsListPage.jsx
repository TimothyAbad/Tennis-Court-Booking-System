import { useCourts } from '../hooks/useCourts'
import { CourtCard } from '../components/courts/CourtCard'
import { EmptyState } from '../components/shared/EmptyState'

export function CourtsListPage() {
  const { courts } = useCourts()

  return (
    <div>
      <div className="mb-6">
        <h1 className="text-2xl font-bold text-gray-900">Available Courts</h1>
        <p className="text-gray-500 text-sm mt-1">Choose a court and pick your time slot</p>
      </div>

      {courts.length === 0 ? (
        <EmptyState icon="🎾" title="No courts available" description="Check back soon." />
      ) : (
        <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-3 gap-4">
          {courts.map((court) => (
            <CourtCard key={court.id} court={court} />
          ))}
        </div>
      )}
    </div>
  )
}
