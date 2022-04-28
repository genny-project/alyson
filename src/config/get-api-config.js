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

let apiConfig = { api_url: '', ENV_GOOGLE_MAPS_APIKEY: '', ENV_GOOGLE_TIMEZONE_APIKEY: '' }
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
  console.log('API CONFIG:', apiConfig)
  /* Log Rocket */
  if (process.env.NODE_ENV !== 'development') {
    LogRocket.init('geop13/alyson-dev', { release: apiConfig.realm })
    setupLogRocketReact(LogRocket)
  }

  /* Keycloak */
  keycloak = new Keycloak({
    realm: apiConfig.realm,
    url: apiConfig.ENV_KEYCLOAK_REDIRECTURI,
    clientId: apiConfig.clientId ? apiConfig.clientId : 'alyson',
  })

  if (includes('public', window.location.pathname)) {
    guestKeycloak = await loginAsGuest()
  }

  tokenFromUrl = getTokenFromURL(keycloak)

  setupGoogleApi()

  /* Theme */
  const { projectTheme } = apiConfig
  const theme = getTheme(projectTheme)

  return { keycloak, theme }
}

export { apiConfig, keycloak, guestKeycloak, tokenFromUrl }
export default getApiConfig
