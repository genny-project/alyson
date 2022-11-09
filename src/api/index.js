import axios from 'axios'
import { apiConfig } from 'config/get-api-config'
import { useKeycloak } from '@react-keycloak/web'
import debounce from 'lodash.debounce'
import { tokenFromUrl, guestKeycloak } from 'config/get-api-config'
import selectToken from 'keycloak/utils/select-token'
import { identity, map } from 'ramda'

const useApi = () => {
  const { keycloak } = useKeycloak()

  const IMAGE_URL = `${apiConfig.api_url}imageproxy`
  const ABN_URL = `${apiConfig.api_url}/json`
  const MEDIA_URL = apiConfig.ENV_MEDIA_PROXY_URL
  const VIDEO_URL = MEDIA_URL

  const { token: tokenFromKeycloak } = keycloak

  const token = selectToken({ guestKeycloak, tokenFromKeycloak, tokenFromUrl })

  const mediaSettings = {
    url: MEDIA_URL,
    method: 'POST',
    responseType: 'json',
    timeout: 0,
    headers: {
      'Content-Type': 'multipart/form-data',
      Authorization: `bearer ${token}`,
    },
  }

  const postMediaFile = async ({ data, onUploadProgress = identity }) => {
    const response = await axios({
      ...mediaSettings,
      onUploadProgress,
      data,
    })
    if (response?.data?.files) return response?.data?.files
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
    uuid && uuid !== '[]'
      ? `${IMAGE_URL}/${dim ? `${dim.width}x${dim.height || ''},fit/` : ''}${MEDIA_URL}/${uuid}`
      : null

  const getImageSrcList = (uuidList, dim) =>
    map(uuid =>
      uuid
        ? `${IMAGE_URL}/${dim ? `${dim.width}x${dim.height || ''},fit/` : ''}${MEDIA_URL}/${uuid}`
        : null,
    )(uuidList || [])

  const getSrc = uuid => (uuid ? `${MEDIA_URL}/${uuid}` : null)

  const getVideoSrc = uuid => (uuid ? `${VIDEO_URL}/${uuid}` : null)

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
    getImageSrcList,
    postMediaFile,
    getSrc,
    getVideoSrc,
    getMediaFileName,
    callAbnLookup,
    token,
  }
}

export default useApi
