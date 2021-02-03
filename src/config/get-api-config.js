import axios from 'axios'
import { INIT_URL } from './genny'

const getApiConfig = async () => {
  const response = await axios({
    responseType: 'json',
    headers: {
      'Content-Type': 'application/json',
    },
    url: INIT_URL,
  })

  return response.data
}

export default getApiConfig
