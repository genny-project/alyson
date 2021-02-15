import axios from 'axios'

const data = new URLSearchParams()
const url = 'https://keycloak.gada.io/auth/realms/internmatch/protocol/openid-connect/token'
const headers = {
  Accept: 'application/json',
  'Content-Type': 'application/x-www-form-urlencoded',
}

const loginAsGuest = async () => {
  try {
    data.append('grant_type', 'password')
    data.append('client_id', 'alyson')
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
