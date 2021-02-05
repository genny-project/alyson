import axios from 'axios'
import Keycloak from 'keycloak-js'
import { INIT_URL } from './genny'

let apiConfig = {}
let keycloak = {}

const getApiConfig = async () => {
  const response = await axios({
    responseType: 'json',
    headers: {
      'Content-Type': 'application/json',
    },
    url: INIT_URL,
  })

  apiConfig = response.data

  keycloak = new Keycloak({
    realm: apiConfig.realm,
    url: apiConfig.ENV_KEYCLOAK_REDIRECTURI,
    clientId: 'alyson',
  })

  document.title = apiConfig.PRI_NAME || ''
  document.querySelector("link[rel*='icon']").href = apiConfig.PRI_FAVICON

  return { keycloak }
}

export { apiConfig, keycloak }
export default getApiConfig
