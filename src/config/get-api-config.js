import axios from 'axios'
import Keycloak from 'keycloak-js'
import { INIT_URL } from './genny'
import getTokenFromURL from 'keycloak/get-token-from-url'
import getTheme from 'config/theme'
import setupGoogleApi from './setup-google-api'

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

  if (apiConfig.PRI_FAVICON) {
    let link = document.querySelector("link[rel~='icon']")
    if (!link) {
      link = document.createElement('link')
      link.rel = 'icon'
      document.getElementsByTagName('head')[0].appendChild(link)
    }
    link.href = apiConfig.PRI_FAVICON
  }

  if (apiConfig.PRI_NAME) {
    document.title = apiConfig.PRI_NAME
  }

  /* Log Rocket */
  // if (process.env.NODE_ENV !== 'development') {
  //   LogRocket.init('ur logrocket key', { release: apiConfig.realm })
  //   setupLogRocketReact(LogRocket)
  // }

  /* Keycloak */
  keycloak = new Keycloak({
    realm: apiConfig.realm,
    url: apiConfig.ENV_KEYCLOAK_REDIRECTURI,
    clientId: 'alyson',
  })

  // if (includes('public', window.location.pathname)) {
  //   guestKeycloak = await loginAsGuest()
  // }

  tokenFromUrl = getTokenFromURL(keycloak)

  setupGoogleApi()

  /* Theme */
  const { projectTheme } = apiConfig
  const theme = getTheme(projectTheme)

  return { keycloak, theme }
}

export { apiConfig, keycloak, guestKeycloak, tokenFromUrl }
export default getApiConfig
