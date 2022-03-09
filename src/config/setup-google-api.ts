import axios from 'axios'
import { HOST } from 'config/genny'

const setupGoogleApi = async () => {
  const maps = document.createElement('script')
  const res = await axios.get(`${HOST}/googleapi/v1/map`, {})
  const src = URL.createObjectURL(new Blob([res.data], { type: 'text/javascript' }))
  maps.setAttribute('src', src)
  // maps.setAttribute(
  //   'src',
  //   `https://maps.googleapis.com/maps/api/js?key=${apiConfig.ENV_GOOGLE_MAPS_APIKEY}&libraries=places,drawing`,
  // )
  document.head.appendChild(maps)
}
export default setupGoogleApi
