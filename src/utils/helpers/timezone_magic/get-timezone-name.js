import axios from 'axios'
import { apiConfig } from 'config/get-api-config'
import timeZone from './time-zone-from-browser'
import {HOST} from "../../../config/genny";
import {token} from "api"

export const fromLatLng = async ({ lat, lng }) => {
  console.log(token)
  try {
    const response = await axios({
      method: 'GET',
      url: `${HOST}/googleapi/v1/timezone?location=${lat},${lng}&timestamp=${Date.now() / 1000}`,
      headers: {
        'Content-Type': 'application/json',
        Authorization: `bearer ${token}`,
      }
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
