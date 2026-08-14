/**
 * Configuration for KapdeCRM Frontend
 */

const getApiBaseUrl = () => {
  // If explicitly provided in environment
  if (import.meta.env.VITE_API_BASE_URL) {
    return import.meta.env.VITE_API_BASE_URL;
  }

  // Handle local development scenarios
  const { hostname, protocol, port } = window.location;
  
  if (hostname === 'localhost' || hostname === '127.0.0.1') {
    // If we are on port 5173 (Vite default) or 3000, the backend is likely on 5000
    if (port === '5173' || port === '3000') {
      return `${protocol}//${hostname}:5000`;
    }
  }

  // In production/deployment, if backend is on the same domain/proxy
  // or if we're accessing from a phone on the same network
  // We might need to use the current hostname but port 5000 if not proxied.
  // However, most deployments (Netlify/Vercel) use a separate backend URL.
  // For now, we default to the same origin with /api or similar if needed.
  return `${protocol}//${hostname}:5000`; // Default fallback for local network access
};

export const API_BASE_URL = getApiBaseUrl();
export const API_AUTH_URL = `${API_BASE_URL}/api/auth`;
export const API_ADMIN_URL = `${API_BASE_URL}/api/admin`;

console.log('KapdeCRM API Base URL:', API_BASE_URL);
