import { includes } from 'ramda'
import axios from 'axios'
import Keycloak from 'keycloak-js'
import { INIT_URL } from './genny'
import loginAsGuest from '../keycloak/login-as-guest'
import setupLogRocketReact from 'logrocket-react'
import LogRocket from 'logrocket'

let apiConfig = {}
let keycloak = {}
let guestKeycloak = null

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
  LogRocket.init('geop13/alyson-dev', { release: apiConfig.realm })
  setupLogRocketReact(LogRocket)

  /* Keycloak */
  keycloak = new Keycloak({
    realm: apiConfig.realm,
    url: apiConfig.ENV_KEYCLOAK_REDIRECTURI,
    clientId: 'alyson',
  })

  if (includes('public', window.location.pathname)) {
    guestKeycloak = await loginAsGuest()
  }

  /* DOM */
  document.title = apiConfig.PRI_NAME || ''
  document.querySelector("link[rel*='icon']").href = apiConfig.PRI_FAVICON

  /* Google Api */
  const maps = document.createElement('script')
  maps.setAttribute(
    'src',
    `https://maps.googleapis.com/maps/api/js?key=${apiConfig.ENV_GOOGLE_MAPS_APIKEY}&libraries=places,drawing`,
  )
  document.head.appendChild(maps)

  return { keycloak }
}

export { apiConfig, keycloak, guestKeycloak }
export default getApiConfig
