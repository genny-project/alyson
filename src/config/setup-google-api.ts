import { apiConfig } from 'config/get-api-config'

const setupGoogleApi = async () => {
  const maps = document.createElement('script')
  maps.setAttribute(
    'src',
    `https://maps.googleapis.com/maps/api/js?key=${apiConfig.ENV_GOOGLE_MAPS_APIKEY}&libraries=places,drawing`,
  )
  document.head.appendChild(maps)
}

export default setupGoogleApi
