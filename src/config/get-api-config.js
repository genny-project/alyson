import { INIT_URL } from './genny'
import Keycloak from 'keycloak-js'
import LogRocket from 'logrocket'
import axios from 'axios'
import getProductTheme from './get-product-theme'
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
  const { colors } = apiConfig
  console.log('the colors are: colors', colors)
  const clientId = apiConfig?.clientId

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
  //to set the product colours received from the backend, you can send the product colour as second argument.
  //ie: getProductTheme(realm, { primary: '', secondary: '' })
  //where productColour needs to be an object with two keys set to primary and secondary.
  const productThemes = getProductTheme(clientId, colors)
  const theme = getTheme(productThemes)

  return { keycloak, theme }
}

export { apiConfig, keycloak, guestKeycloak, tokenFromUrl }
export default getApiConfig
