import axios from 'axios'
import { useKeycloak } from '@react-keycloak/web'
import debounce from 'lodash.debounce'
import { identity, map } from 'ramda'

import { apiConfig } from 'config/get-api-config'
import { tokenFromUrl, guestKeycloak } from 'config/get-api-config'
import selectToken from 'keycloak/utils/select-token'
import isJson from 'utils/helpers/is-json'

const useApi = () => {
  const { keycloak } = useKeycloak()

  const IMAGE_URL = `${apiConfig.api_url}imageproxy`
  const ABN_URL = `${apiConfig.api_url}/json`
  const MEDIA_URL = apiConfig.ENV_MEDIA_PROXY_URL
  const VIDEO_URL = MEDIA_URL

  const { token: tokenFromKeycloak } = keycloak

  //const token = selectToken({ guestKeycloak, tokenFromKeycloak, tokenFromUrl })
  const token =
    'eyJhbGciOiJSUzI1NiIsInR5cCIgOiAiSldUIiwia2lkIiA6ICJwU180dHhEMTJpUVJIZlJaLURRLTFaRWlGS3pWYkttVVFFWjdqOUdPaTZVIn0.eyJleHAiOjE2ODI1NTI2MDksImlhdCI6MTY3OTk2MDYwOSwiYXV0aF90aW1lIjoxNjc5OTYwNjA3LCJqdGkiOiJlYWVjOGQ0Yi0yNTI0LTQ5NzAtOThlOC1iYjgxZGM4OGU5NWMiLCJpc3MiOiJodHRwczovL2tleWNsb2FrLXRlc3RpbmcuZ2FkYS5pby9hdXRoL3JlYWxtcy9pbnRlcm5tYXRjaCIsImF1ZCI6ImFjY291bnQiLCJzdWIiOiI1NGFkZDFiNy05YWJlLTQ4YzctYjdjOS1lMjE4NmFlOTNkNmUiLCJ0eXAiOiJCZWFyZXIiLCJhenAiOiJsb2ppbmciLCJub25jZSI6IjQzMTIxYjY0LTllNGQtNDc2YS05ZmViLTI0ZjU1MTYwZjVhMiIsInNlc3Npb25fc3RhdGUiOiJmMTBlZDI0OS0yZjM0LTQ3ZjQtODVkZC1hMWU2YjZkNzg2ZmMiLCJhbGxvd2VkLW9yaWdpbnMiOlsiaHR0cHM6Ly9tZW50b3JtYXRjaC5nZW5ueS5saWZlIiwiaHR0cHM6Ly9sb2ppbmcuZ2FkYS5pbyIsImh0dHBzOi8vYWx5c29uLmdlbm55LmxpZmUiLCJodHRwOi8vbG9jYWxob3N0OjQwMDA5IiwiaHR0cHM6Ly9sb2ppbmctZGV2LmdhZGEuaW8iLCJodHRwczovL2xvamluZy1zdGFnaW5nLmdhZGEuaW8iLCJodHRwOi8vbG9jYWxob3N0OjMwMDAiLCJodHRwczovL21lbnRvcm1hdGNoLmdhZGEuaW8iLCJodHRwczovL21lbnRvci1tYXRjaC5pbyIsImh0dHBzOi8vbG9qaW5nLWRldi1vZmZpY2UuZ2FkYS5pbyIsImh0dHBzOi8vbG9qaW5nLXN0YWdpbmctb2ZmaWNlLmdhZGEuaW8iLCJodHRwczovL2xvamluZy5nZW5ueS5saWZlIiwiaHR0cHM6Ly9tZW50b3JtYXRjaC1zdGFnaW5nLmdhZGEuaW8iXSwicmVhbG1fYWNjZXNzIjp7InJvbGVzIjpbIm9mZmxpbmVfYWNjZXNzIiwidW1hX2F1dGhvcml6YXRpb24iLCJkZWZhdWx0LXJvbGVzLWludGVybm1hdGNoIiwidXNlciJdfSwicmVzb3VyY2VfYWNjZXNzIjp7ImFjY291bnQiOnsicm9sZXMiOlsibWFuYWdlLWFjY291bnQiLCJtYW5hZ2UtYWNjb3VudC1saW5rcyIsInZpZXctcHJvZmlsZSJdfX0sInNjb3BlIjoib3BlbmlkIHByb2ZpbGUgZW1haWwiLCJzaWQiOiJmMTBlZDI0OS0yZjM0LTQ3ZjQtODVkZC1hMWU2YjZkNzg2ZmMiLCJlbWFpbF92ZXJpZmllZCI6dHJ1ZSwibmFtZSI6ImVxd2UgcXdyd3IiLCJwcmVmZXJyZWRfdXNlcm5hbWUiOiJxd3Jxd0B2ZHYubGsiLCJnaXZlbl9uYW1lIjoiZXF3ZSIsImZhbWlseV9uYW1lIjoicXdyd3IiLCJlbWFpbCI6InF3cnF3QHZkdi5sayJ9.OkUtI5Pckje0HQ3Xv9f2fHWKaKzjTnukoxWr7oQczM0yB8hfjIrm36STu-K5h9ZdSvqeI74oQy_lOBol5I7jde5d90fGw97Dn-tqzYhIFZYjYQSM4u1GFu6erC_YnszuuWHtB9sB1W_cIUVTRIq31iiRbVDpKiaGrMH2EPD0-N9g8CDlK0R4RMnuMatEvIAcEwe0RNGwL9MRxb7K8yw6gJi7ExjL_MEUxpUoGrVsFgScVoLcxhpO4kkd9ekiMy-vLFdwC_gkm5oQhipDhq0UCYUXn9Uh85FNkYYnTWqj4mjzzG1VU5wFRWa10NnLDxaCjva8HGwO3PjRp-VAxzXI6g'
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
    console.log(token)
    const response = await axios({
      ...mediaSettings,
      onUploadProgress,
      data,
    })
    if (response?.data?.files) return response?.data?.files
    return {}
  }

  const getMediaFileName = async uuid => {
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

  const getImageSrc = (uuidValue, dim, scale) => {
    let uuid = isJson(uuidValue) ? JSON.parse(uuidValue) : uuidValue

    return uuid && uuid !== '[]'
      ? `${IMAGE_URL}/${dim ? `${dim.width}x${dim.height || ''}` : ''}${
          scale ? `,${scale}` : ''
        }/${MEDIA_URL}/${uuid}`
      : null
  }

  const getDocumentSrc = uuid => (uuid && uuid !== '[]' ? `${MEDIA_URL}/${uuid}` : null)

  const getImageSrcList = (uuidList, dim, scale) => {
    let srcList = isJson(uuidList) ? JSON.parse(uuidList) : uuidList

    return map(uuid =>
      uuid
        ? `${IMAGE_URL}/${dim ? `${dim.width}x${dim.height || ''}` : ''}${
            scale ? `,${scale}` : ''
          }/${MEDIA_URL}/${uuid}`
        : null,
    )(srcList || [])
  }

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
    getDocumentSrc,
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
