import { apiConfig } from 'config/get-api-config'
import axios from 'axios'
//const setupGoogleApi = async ({ token }: { token: string }) => {
const setupGoogleApi = () => {
  const maps = document.createElement('script')
  // const res = await axios.get(`${apiConfig.api_url}/googleapi/v1/map`, {
  //   headers: { Authorization: `bearer ${token}` },
  // })
  // const src = URL.createObjectURL(new Blob([res.data], { type: 'text/javascript' }))
  maps.setAttribute(
    'src',
    `https://maps.googleapis.com/maps/api/js?key=${apiConfig.ENV_GOOGLE_MAPS_APIKEY}&libraries=places,drawing`,
  )
  document.head.appendChild(maps)
}

export default setupGoogleApi
