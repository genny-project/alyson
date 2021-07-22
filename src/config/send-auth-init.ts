import axios from 'axios'
import { Keyable } from 'utils/types'
import { INIT_URL } from './genny'

const sendAuthInit = async (token: Keyable) =>
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
