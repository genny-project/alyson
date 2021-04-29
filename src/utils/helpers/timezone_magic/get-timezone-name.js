import axios from 'axios'
import { apiConfig } from 'config/get-api-config'
import timeZone from './time-zone-from-browser'

export const fromLatLng = async ({ lat, lng }) => {
  try {
    const response = await axios({
      method: 'GET',
      url: `https://maps.googleapis.com/maps/api/timezone/json?location=${lat},${lng}&key=${
        apiConfig.ENV_GOOGLE_MAPS_APIKEY
      }&timestamp=${Date.now() / 1000}`,
    })
    const { data } = response
    if (data.errorMessage) throw new Error(data.errorMessage)
    return data
  } catch (err) {
    console.error(
      `There was an error trying to fetch the timezone you requested, the timezone has been set to ${timeZone}`,
      err,
    )
    return timeZone
  }
}
