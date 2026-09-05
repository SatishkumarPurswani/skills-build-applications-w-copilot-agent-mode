const codespaceName = import.meta.env.VITE_CODESPACE_NAME?.trim()
const configuredApiBaseUrl = import.meta.env.VITE_API_BASE_URL?.trim()

function getApiBaseUrl() {
  if (configuredApiBaseUrl) return configuredApiBaseUrl.replace(/\/$/, '')
  if (codespaceName) return `https://${codespaceName}-8000.app.github.dev/api`

  if (typeof window !== 'undefined') {
    const { hostname, origin, protocol } = window.location
    const codespaceHost = hostname.match(/^(.*)-5173(\..+)$/)
    if (codespaceHost) return `${protocol}//${codespaceHost[1]}-8000${codespaceHost[2]}/api`
    if (hostname === 'localhost' || hostname === '127.0.0.1') return 'http://localhost:8000/api'
    return `${origin}/api`
  }

  return 'http://localhost:8000/api'
}

export const apiBaseUrl = getApiBaseUrl()
const pendingRequests = new Map()

export function collectionFrom(payload) {
  if (Array.isArray(payload)) return payload
  if (Array.isArray(payload?.data)) return payload.data
  if (Array.isArray(payload?.items)) return payload.items
  if (Array.isArray(payload?.results)) return payload.results
  if (Array.isArray(payload?.data?.items)) return payload.data.items
  if (Array.isArray(payload?.data?.results)) return payload.data.results
  return []
}

export async function getCollection(endpoint) {
  if (pendingRequests.has(endpoint)) return pendingRequests.get(endpoint)

  const request = fetch(`${apiBaseUrl}/${endpoint.replace(/^\/+|\/+$/g, '')}/`)
    .then((response) => {
      if (!response.ok) throw new Error(`Could not load ${endpoint}`)
      return response.json()
    })
    .then(collectionFrom)
    .finally(() => pendingRequests.delete(endpoint))

  pendingRequests.set(endpoint, request)
  return request
}