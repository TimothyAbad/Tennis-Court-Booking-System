import { NavLink } from 'react-router-dom'
import { authClient } from '../../lib/auth'
import { Button } from '../shared/Button'

export function Navbar() {
  const { data: session } = authClient.useSession()
  const user = session?.user

  const linkClass = ({ isActive }) =>
    `px-3 py-2 rounded-lg text-sm font-medium transition-colors ${
      isActive
        ? 'bg-green-100 text-green-700'
        : 'text-gray-600 hover:bg-gray-100 hover:text-gray-900'
    }`

  return (
    <header className="bg-white border-b border-gray-200 sticky top-0 z-10">
      <div className="max-w-5xl mx-auto px-4 flex items-center justify-between h-14">
        <NavLink to="/courts" className="flex items-center gap-2 font-bold text-gray-900 text-lg">
          <span className="text-2xl">🎾</span>
          <span>CourtBook</span>
        </NavLink>
        <div className="flex items-center gap-2">
          {user && (
            <>
              <nav className="flex items-center gap-1">
                <NavLink to="/courts" className={linkClass}>Courts</NavLink>
                <NavLink to="/bookings" className={linkClass}>My Bookings</NavLink>
              </nav>
              <div className="w-px h-5 bg-gray-200 mx-1" />
              <span className="text-sm text-gray-500 hidden sm:block">{user.email}</span>
              <Button variant="ghost" className="text-sm" onClick={() => authClient.signOut()}>
                Sign out
              </Button>
            </>
          )}
        </div>
      </div>
    </header>
  )
}
