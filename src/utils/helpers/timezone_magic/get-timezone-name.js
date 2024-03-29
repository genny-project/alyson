import axios from 'axios'
import timeZone from './time-zone-from-browser'
import { HOST } from '../../../config/genny'

export const fromLatLng = async ({ lat, lng, token }) => {
  try {
    const response = await axios({
      method: 'GET',
      url: `${HOST}/googleapi/v1/timezone?location=${lat},${lng}&timestamp=${Math.round(Date.now() / 1000)}`,
      headers: {
        'Content-Type': 'application/json',
      },
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
