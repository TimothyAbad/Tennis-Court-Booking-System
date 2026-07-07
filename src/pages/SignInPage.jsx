import { useState } from 'react'
import { useNavigate } from 'react-router-dom'
import { authClient } from '../lib/auth'
import { Button } from '../components/shared/Button'

export function SignInPage() {
  const navigate = useNavigate()
  const [tab, setTab] = useState('signin')
  const [email, setEmail] = useState('')
  const [password, setPassword] = useState('')
  const [name, setName] = useState('')
  const [error, setError] = useState(null)
  const [loading, setLoading] = useState(false)

  async function handleSubmit(e) {
    e.preventDefault()
    setError(null)
    setLoading(true)
    try {
      if (tab === 'signin') {
        const { error } = await authClient.signIn.email({ email, password })
        if (error) throw new Error(error.message)
      } else {
        const { error } = await authClient.signUp.email({ email, password, name })
        if (error) throw new Error(error.message)
      }
      navigate('/courts')
    } catch (err) {
      setError(err.message || 'Something went wrong. Please try again.')
    } finally {
      setLoading(false)
    }
  }

  return (
    <div className="flex justify-center py-12 px-4">
      <div className="bg-white rounded-2xl border border-gray-200 shadow-sm w-full max-w-sm p-8">
        <div className="text-center mb-6">
          <span className="text-4xl">🎾</span>
          <h1 className="text-xl font-bold text-gray-900 mt-2">CourtBook</h1>
        </div>

        <div className="flex rounded-lg border border-gray-200 p-1 mb-6">
          <button
            onClick={() => { setTab('signin'); setError(null) }}
            className={`flex-1 py-1.5 text-sm font-medium rounded-md transition-colors ${tab === 'signin' ? 'bg-green-600 text-white' : 'text-gray-600 hover:text-gray-900'}`}
          >
            Sign in
          </button>
          <button
            onClick={() => { setTab('signup'); setError(null) }}
            className={`flex-1 py-1.5 text-sm font-medium rounded-md transition-colors ${tab === 'signup' ? 'bg-green-600 text-white' : 'text-gray-600 hover:text-gray-900'}`}
          >
            Sign up
          </button>
        </div>

        <form onSubmit={handleSubmit} className="space-y-4">
          {tab === 'signup' && (
            <div>
              <label className="block text-sm font-medium text-gray-700 mb-1">Name</label>
              <input
                type="text"
                required
                value={name}
                onChange={e => setName(e.target.value)}
                placeholder="Jane Smith"
                className="block w-full border border-gray-300 rounded-lg px-3 py-2 text-sm focus:outline-none focus:ring-2 focus:ring-green-500"
              />
            </div>
          )}
          <div>
            <label className="block text-sm font-medium text-gray-700 mb-1">Email</label>
            <input
              type="email"
              required
              value={email}
              onChange={e => setEmail(e.target.value)}
              placeholder="you@example.com"
              className="block w-full border border-gray-300 rounded-lg px-3 py-2 text-sm focus:outline-none focus:ring-2 focus:ring-green-500"
            />
          </div>
          <div>
            <label className="block text-sm font-medium text-gray-700 mb-1">Password</label>
            <input
              type="password"
              required
              value={password}
              onChange={e => setPassword(e.target.value)}
              placeholder="••••••••"
              className="block w-full border border-gray-300 rounded-lg px-3 py-2 text-sm focus:outline-none focus:ring-2 focus:ring-green-500"
            />
          </div>

          {error && <p className="text-sm text-red-600">{error}</p>}

          <Button type="submit" variant="primary" className="w-full" disabled={loading}>
            {loading ? 'Please wait…' : tab === 'signin' ? 'Sign in' : 'Create account'}
          </Button>
        </form>
      </div>
    </div>
  )
}
