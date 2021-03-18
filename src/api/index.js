import axios from 'axios'
import { apiConfig } from 'config/get-api-config'
import { useKeycloak } from '@react-keycloak/web'
import debounce from 'lodash.debounce'

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

  const postMediaFile = async ({ data }) => {
    const response = await axios({
      ...mediaSettings,
      data,
    })
    if (response.data.files)
      return {
        uuid: `${response.data.files[0].uuid}`,
        name: response.data.files[0].name,
      }
    return {}
  }

  const getMediaFileName = async ({ uuid }) => {
    if (!uuid) return ''
    const resp = await axios({
      method: 'GET',
      url: `${MEDIA_URL}/${uuid}/name`,
      headers: {
        Authorization: `bearer ${token}`,
      },
    })
    return resp?.data?.data?.name || ''
  }

  const getImageSrc = (uuid, dim) =>
    uuid
      ? `${IMAGE_URL}/${dim ? `${dim.width}x${dim.height || ''},fit/` : ''}${MEDIA_URL}/${uuid}`
      : null
  const getSrc = uuid => (uuid ? `${MEDIA_URL}/${uuid}` : null)

  const callABN = async value =>
    await axios({
      method: 'GET',
      url: `${ABN_URL}?name=${value}&size=${5}`,
      headers: {
        Authorization: `bearer ${token}`,
      },
    })

  const callAbnLookup = debounce(async ({ value, onResult, setLoading }) => {
    setLoading(true)

    const resp = await callABN(value)

    onResult(resp?.data.names || [])
    setLoading(false)
  }, 800)

  return {
    getImageSrc,
    postMediaFile,
    getSrc,
    getMediaFileName,
    callAbnLookup,
  }
}

export default useApi
