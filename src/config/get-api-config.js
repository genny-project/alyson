import { INIT_URL } from './genny'
import Keycloak from 'keycloak-js'
import LogRocket from 'logrocket'
import axios from 'axios'
import { clientId } from 'utils/constants'
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

  /* Log Rocket */
  if (process.env.NODE_ENV !== 'development') {
    LogRocket.init('geop13/alyson-dev', { release: apiConfig.realm })
    setupLogRocketReact(LogRocket)
  }

  if (!apiConfig.clientId) {
    console.error(
      'Did not receive a clientId from bridge! ',
      apiConfig?.realm ? 'Realm received:' + apiConfig.realm : 'No realm received',
    )
  }

  /* Keycloak */
  keycloak = new Keycloak({
    realm: apiConfig.realm,
    url: apiConfig.ENV_KEYCLOAK_REDIRECTURI,
    clientId: apiConfig.clientId || clientId, // We can't afford to default this
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
  const appIcon = apiConfig.PRI_FAVICON

  return { keycloak, theme, title, appIcon }
}

export { apiConfig, keycloak, guestKeycloak, tokenFromUrl }
export default getApiConfig
