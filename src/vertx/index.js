import EventBus from '@vertx/eventbus-bridge-client.js'
import { compose, identity } from 'ramda'
import { VERTX_URL } from 'config/genny'
import { useKeycloak } from '@react-keycloak/web'
import sendAuthInit from 'config/send-auth-init'
import { messageHandler } from './handlers'
import { useDispatch } from 'react-redux'
import { newCmd, newMsg, sendMessage } from 'redux/app'
import makeAuthInitData from './utils/make-auth-init-data'
import createSendMessage from './utils/create-send-message'
import urlStateManager from 'utils/url-state-manager'

import { tokenFromUrl, guestKeycloak } from 'config/get-api-config'
import { getSessionIdFromToken } from 'keycloak/get-token-from-url'
import sleep from 'utils/helpers/sleep'
import selectToken from 'keycloak/utils/select-token'

export const eventBus = new EventBus(VERTX_URL)

const callBucketView = async () => {
  await sleep(500)
  onSendMessage(
    { code: 'QUE_TAB_BUCKET_VIEW', parentCode: 'QUE_TAB_BUCKET_VIEW' },
    { redirect: false },
  )
}

let onSendMessage = identity

const onSendAnswer = data =>
  onSendMessage([data], {
    redirect: false,
    msg_type: 'DATA_MSG',
    data_type: 'Answer',
    event_type: false,
  })

const onSendFilter = ({ value, attributeCode, targetCode, sourceCode, type, weight }) =>
  onSendAnswer({
    askId: 0,
    attributeCode,
    code: 'QUE_FILTER',
    identifier: 'QUE_FILTER',
    type,
    weight,
    value: `L:${value}`,
    targetCode,
    sourceCode,
  })

const onSendSearch = ({ searchValue, searchType = '', sbeCode }) =>
  onSendAnswer({
    askId: 272,
    attributeCode: 'PRI_SEARCH_TEXT',
    code: 'QUE_SEARCH',
    identifier: 'QUE_SEARCH',
    weight: 1,
    value: `${searchType}${searchValue}`,
    ...(sbeCode ? { targetCode: sbeCode } : {}),
  })

const VertxContainer = () => {
  const { keycloak } = useKeycloak()
  const { login, logout } = keycloak
  const { sessionId: kSessionId, token: tokenFromKeycloak } = keycloak
  const guestSessionId = guestKeycloak?.data?.session_state
  const urlSessionId = tokenFromUrl ? getSessionIdFromToken(tokenFromUrl) : null

  const token = selectToken({ guestKeycloak, tokenFromKeycloak, tokenFromUrl })
  const sessionId = kSessionId || urlSessionId || guestSessionId

  const dispatch = useDispatch()
  const onNewCmd = compose(dispatch, newCmd)
  const onNewMsg = compose(dispatch, newMsg)
  const onSendMsg = compose(dispatch, sendMessage)

  if (!(token && sessionId) && !guestKeycloak) login({ redirectUri: `${window.location.href}` })
  if (guestKeycloak && tokenFromKeycloak) logout()
  if (!eventBus.handlers[sessionId]) {
    try {
      eventBus.registerHandler(sessionId, (_, { body }) => {
        if (body.msg_type === 'CMD_MSG') onNewCmd(body)
        else messageHandler(onNewMsg)(body)
      })
    } catch (err) {
      console.error(err)
      window.location.reload()
    }

    sendAuthInit({ token })

    eventBus.send('address.inbound', {
      data: makeAuthInitData({ sessionId, token }),
    })

    onSendMessage = createSendMessage(token, onSendMsg)

    callBucketView()

    urlStateManager(onSendMessage)(window.location.pathname)
  }

  return null
}

export default VertxContainer
export { onSendMessage, onSendAnswer, onSendSearch, onSendFilter }
