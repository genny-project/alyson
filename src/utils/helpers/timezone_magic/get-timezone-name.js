import axios from 'axios'
import { apiConfig } from 'config/get-api-config'
import timeZone from './time-zone-from-browser'

export const fromLatLng = async ({ lat, lng, token }) => {
  try {
    const response = await axios({
      method: 'GET',
      url: `https://maps.googleapis.com/maps/api/timezone?location=${lat},${lng}&key=${apiConfig.ENV_GOOGLE_MAPS_APIKEY}`,
      headers: {
        Authorization: `bearer ${token}`,
      },
    })
    const { data } = response
    return data
  } catch (err) {
    console.error(
      `There was an error trying to fetch the timezone you requested, the timezone has been set to ${timeZone}`,
      err,
    )
    return timeZone
  }
}
