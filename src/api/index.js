import axios from 'axios'
import { apiConfig } from 'config/get-api-config'
import { useKeycloak } from '@react-keycloak/web'

const useApi = () => {
  const { keycloak } = useKeycloak()

  const IMAGE_URL = `${apiConfig.api_url}/imageproxy`
  const ABN_URL = `${apiConfig.api_url}/json`
  const MEDIA_URL = apiConfig.ENV_MEDIA_PROXY_URL

  const token = keycloak.token

  const mediaSettings = {
    url: MEDIA_URL,
    method: 'POST',
    responseType: 'json',
    timeout: 30000,
    headers: {
      'Content-Type': 'multipart/form-data',
      Authorization: `bearer ${token}`,
    },
  }

  const getImageSrc = uuid => `${IMAGE_URL}/${MEDIA_URL}/${uuid}`

  return {
    getImageSrc,
  }
}

export default useApi
