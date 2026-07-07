const BASE_URL = import.meta.env.VITE_NEON_DATABASE_URL

async function request(path, options = {}, authToken) {
  const { headers = {}, ...rest } = options
  const res = await fetch(`${BASE_URL}${path}`, {
    ...rest,
    headers: {
      Authorization: `Bearer ${authToken}`,
      'Content-Type': 'application/json',
      Accept: 'application/json',
      ...headers,
    },
  })
  if (!res.ok) {
    const text = await res.text()
    throw new Error(`API error ${res.status}: ${text}`)
  }
  if (res.status === 204) return null
  return res.json()
}

export const api = {
  get: (path, authToken) =>
    request(path, { method: 'GET' }, authToken),
  post: (path, body, authToken) =>
    request(path, { method: 'POST', body: JSON.stringify(body), headers: { Prefer: 'return=representation' } }, authToken),
  patch: (path, body, authToken) =>
    request(path, { method: 'PATCH', body: JSON.stringify(body), headers: { Prefer: 'return=representation' } }, authToken),
}
