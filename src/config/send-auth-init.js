import axios from 'axios'
import { INIT_URL } from './genny'

const sendAuthInit = async ({ token }) =>
  axios.post(INIT_URL, {
    method: 'POST',
    responseType: 'json',
    timeout: 30000,
    headers: {
      'Content-Type': 'application/json',
      Authorization: `Bearer ${token}`,
    },
  })

export default sendAuthInit
