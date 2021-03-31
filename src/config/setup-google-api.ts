import { apiConfig } from 'config/get-api-config'
import axios from 'axios'
const setupGoogleApi = async (token: string) => {
  const maps = document.createElement('script')
  const res = await axios.get(`${apiConfig.api_url}/googleapi/v1/map`, {
    headers: { Authorization: `bearer ${token}` },
  })
  const src = URL.createObjectURL(new Blob([res.data], { type: 'text/javascript' }))
  maps.setAttribute('src', src)
  document.head.appendChild(maps)
}

export default setupGoogleApi
