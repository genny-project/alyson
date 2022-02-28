import { apiConfig } from 'config/get-api-config'
import {HOST} from "./genny";
import axios from 'axios'
import {token} from "api"
const setupGoogleApi = async () => {
  const maps = document.createElement('script')
  const res = await axios.get(`${HOST}/googleapi/v1/map`, {
    headers: { Authorization: `bearer ${token}` },
  })
  const src = URL.createObjectURL(new Blob([res.data], { type: 'text/javascript' }))
  maps.setAttribute('src', src)
  // maps.setAttribute(
  //   'src',
  //   `${HOST}/googleapi/v1/map`,
  // )
  document.head.appendChild(maps)
}

export default setupGoogleApi
