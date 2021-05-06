import axios from 'axios'
import { INIT_URL } from './genny'

export const wkid = btoa(`${Math.random()}`)

const sendAuthInit = async ({ token }) =>
  axios.post(INIT_URL, {
    method: 'POST',
    responseType: 'json',
    timeout: 30000,
    headers: {
      'Content-Type': 'application/json',
      Authorization: `Bearer ${token}`,
      wkid,
    },
  })

export default sendAuthInit
