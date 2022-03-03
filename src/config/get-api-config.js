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

  //need to make this call to get the token from the keycloak, you can only access the properties of the keycloak once you have successfully called the init method of keycloak
  await keycloak.init({ onLoad: 'login-required' })
  //now we have ran keycloak.init({}) method, we can get token property of keycloak object by doing keycloak.token, otherwise
  const tokenFromKeycloak = keycloak.token

  tokenFromUrl = getTokenFromURL(keycloak)

  setupGoogleApi(tokenFromKeycloak)

  /* Theme */
  const { projectTheme } = apiConfig
  const theme = getTheme(projectTheme)
  const title = apiConfig.realm
  const appIcon = apiConfig.PRI_FAVICON

  return { keycloak, theme, title, appIcon }
}

export { apiConfig, keycloak, guestKeycloak, tokenFromUrl }
export default getApiConfig
