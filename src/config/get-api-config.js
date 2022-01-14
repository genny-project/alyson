import { INIT_URL } from './genny'
import Keycloak from 'keycloak-js'
import LogRocket from 'logrocket'
import axios from 'axios'
import getTheme from 'config/theme'
import getTokenFromURL from 'keycloak/get-token-from-url'
import { includes } from 'ramda'
import loginAsGuest from '../keycloak/login-as-guest'
import setupGoogleApi from './setup-google-api'
import setupLogRocketReact from 'logrocket-react'

let apiConfig = { api_url: '', ENV_GOOGLE_MAPS_APIKEY: '' }
let keycloak = {}
let guestKeycloak = null
let tokenFromUrl = null

const getApiConfig = async () => {
  const response = await axios({
    responseType: 'json',
    headers: {
      'Content-Type': 'application/json',
    },
    url: INIT_URL,
  })

  apiConfig = response.data

  /* Log Rocket */
  if (process.env.NODE_ENV !== 'development') {
    LogRocket.init('geop13/alyson-dev', { release: apiConfig.realm })
    setupLogRocketReact(LogRocket)
  }

  /* Keycloak */
  keycloak = new Keycloak({
    realm: apiConfig.realm,
    url: apiConfig.ENV_KEYCLOAK_REDIRECTURI,
    clientId: 'alyson',
  })

  if (includes('public', window.location.pathname)) {
    guestKeycloak = await loginAsGuest()
  }

  tokenFromUrl = getTokenFromURL(keycloak)

  setupGoogleApi()

  /* Theme */
  const { projectTheme } = apiConfig
  const theme = getTheme(projectTheme)
  const title = apiConfig.realm
  // const appTitle = apiConfig.realm.charAt(0).toUpperCase() + apiConfig.realm.toLowerCase().slice(1)
  const appIcon = apiConfig.PRI_FAVICON

  console.log('%c apiconfig', 'color: red; font-size: 20px', keycloak)

  return { keycloak, theme, title, appIcon }
}

export { apiConfig, keycloak, guestKeycloak, tokenFromUrl }
export default getApiConfig
