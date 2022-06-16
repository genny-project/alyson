import axios from 'axios'
import { INIT_URL } from './genny'

const sendAuthInit = async ({ token }) =>
  axios.post(
    INIT_URL,
    {
      method: 'POST',
      responseType: 'json',
      timeout: 30000,
      headers: {
        'Content-Type': 'application/json',
        Authorization: `Bearer ${token}`,
      },
    },
    /*
     * Below are the real headers but above is just a body with key headers
     * However the ones above will need to be kept to support the lagacy apps
     * */
    {
      headers: {
        'Content-Type': 'application/json',
        Authorization: `Bearer ${token}`,
      },
    },
  )

export default sendAuthInit
