import { Badge } from '../shared/Badge'

const surfaceColors = { Hard: 'blue', Clay: 'yellow', Grass: 'green' }

export function CourtBadge({ surface, type }) {
  return (
    <div className="flex gap-1.5">
      <Badge color={surfaceColors[surface] ?? 'gray'}>{surface}</Badge>
      <Badge color={type === 'Indoor' ? 'gray' : 'green'}>{type}</Badge>
    </div>
  )
}
