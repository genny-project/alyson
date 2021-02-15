import jwt_decode from 'jwt-decode'

const getTokenFromURL = keycloak => {
  const tokenFromURL = new URLSearchParams(window.location.search).get('token')
  if (window && tokenFromURL) {
    if (keycloak?.authenticated) keycloak.logout()
    window.localStorage.localToken = tokenFromURL
  }
  return tokenFromURL
}

export const getSessionIdFromToken = token => jwt_decode(token)?.session_state || ''

export default getTokenFromURL
