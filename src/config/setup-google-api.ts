import { HOST } from './genny'
import axios from 'axios'
import { useKeycloak } from '@react-keycloak/web'
import { pathOr } from 'ramda'

const useSetupGoogleApi = async () => {
  const { keycloak } = useKeycloak()
  const token = pathOr('', ['token'])(keycloak)

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

export default useSetupGoogleApi
