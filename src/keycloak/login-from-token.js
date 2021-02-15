import axios from 'axios'

const data = new URLSearchParams()
const url = 'https://keycloak.gada.io/auth/realms/internmatch/protocol/openid-connect/token'
const headers = {
  Accept: 'application/json',
  'Content-Type': 'application/x-www-form-urlencoded',
}

const loginFromToken = async ({ token }) => {
  try {
    data.append('grant_type', 'token')
    data.append('client_id', 'alyson')
    data.append('token', token)

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

export default loginFromToken
