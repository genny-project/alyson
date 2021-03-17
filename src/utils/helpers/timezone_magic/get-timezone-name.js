import axios from 'axios'
import { apiConfig } from 'config/get-api-config'
import timeZone from './time-zone-from-browser'

export const fromLatLng = async ({ lat, lng }) => {
  const turnThisOn = await axios.get(
    `${
      apiConfig.api_url
    }/maps/api/timezone/json?location=${lat},${lng}&timestamp=${Date.now()}&key=${
      apiConfig.ENV_GOOGLE_MAPS_APIKEY
    }`,
  )

  return timeZone
}
