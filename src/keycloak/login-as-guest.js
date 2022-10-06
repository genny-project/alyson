import { apiConfig } from 'config/get-api-config'
import axios from 'axios'

const data = new URLSearchParams()
const keycloakUrl = Process.env('ENV_KEYCLOAK_REDIRECTURI')
const realm = Process.env('GENNY_KEYCLOAK_REALM')
const url = 'https://' + keycloakUrl + '/auth/realms/' + realm + '/protocol/openid-connect/token'
const headers = {
  Accept: 'application/json',
  'Content-Type': 'application/x-www-form-urlencoded',
}

const loginAsGuest = async () => {
  try {
    let clientId = apiConfig?.clientId
    if (clientId) {
      console.error('Guest defaulting clientId to alyson')
      clientId = 'alyson'
    }

    data.append('grant_type', 'password')
    data.append('client_id', clientId)
    data.append('username', 'support@internmatch.io')
    data.append('password', 'guest')

    const res = await axios.request({
      method: 'POST',
      url,
      data,
      headers,
    })

    return res
  } catch (err) {
    console.error(err)
  }
}

export default loginAsGuest
