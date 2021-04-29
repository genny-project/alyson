import jwt_decode from 'jwt-decode'

const getTokenFromURL = keycloak => {
  const tokenFromURL = new URLSearchParams(window.location.search).get('token')
  if (window && tokenFromURL) {
    if (keycloak?.authenticated) keycloak.logout()
    window.localStorage.localToken = tokenFromURL
  }
  return tokenFromURL
}

export const getSessionIdFromToken = token => {
  try {
    return jwt_decode(token)?.session_state || ''
  } catch (err) {
    console.error(err)
    return ''
  }
}

export default getTokenFromURL
