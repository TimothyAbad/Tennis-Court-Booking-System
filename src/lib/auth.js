import { createAuthClient } from 'better-auth/react'

export const authClient = createAuthClient({
  baseURL: import.meta.env.VITE_AUTH_URL,
})

export async function getJwt() {
  const res = await fetch(`${import.meta.env.VITE_AUTH_URL}/token`, {
    method: 'GET',
    credentials: 'include',
  })
  if (!res.ok) {
    const text = await res.text()
    throw new Error(`Failed to get JWT: ${res.status} ${text}`)
  }
  const data = await res.json()
  return data.token
}
