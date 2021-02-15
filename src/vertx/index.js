import EventBus from 'vertx3-eventbus-client'
import { compose, identity } from 'ramda'
import { VERTX_URL } from 'config/genny'
import { useKeycloak } from '@react-keycloak/web'
import sendAuthInit from 'config/send-auth-init'
import { messageHandler } from './handlers'
import { useDispatch } from 'react-redux'
import { newCmd, newMsg } from 'redux/app'
import makeAuthInitData from './utils/make-auth-init-data'
import createSendMessage from './utils/create-send-message'
import urlStateManager from 'utils/url-state-manager'

import { tokenFromUrl, guestKeycloak } from 'config/get-api-config'
import { getSessionIdFromToken } from 'keycloak/get-token-from-url'

export const eventBus = new EventBus(VERTX_URL)

let onSendMessage = identity

const onSendAnswer = data =>
  onSendMessage([data], { msg_type: 'DATA_MSG', data_type: 'Answer', event_type: false })

const onSendFilter = ({ value, attributeCode, targetCode, sourceCode, type }) =>
  onSendAnswer({
    askId: 0,
    attributeCode,
    code: 'QUE_FILTER',
    identifier: 'QUE_FILTER',
    type,
    weight: 1,
    value: `L:${value}`,
    targetCode,
    sourceCode,
  })

const onSendSearch = ({ searchValue, searchType, sbeCode }) =>
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
  const { login } = keycloak
  const { sessionId: kSessionId, token: kToken } = keycloak
  const guestSessionId = guestKeycloak?.data?.session_state
  const guestToken = guestKeycloak?.data?.access_token
  const urlToken = tokenFromUrl
  const urlSessionId = urlToken ? getSessionIdFromToken(urlToken) : null

  const token = kToken || urlToken || guestToken
  const sessionId = kSessionId || urlSessionId || guestSessionId

  const dispatch = useDispatch()
  const onNewCmd = compose(dispatch, newCmd)
  const onNewMsg = compose(dispatch, newMsg)

  if (!(token && sessionId)) login({ redirectUri: `${window.location.href}` })

  if (!eventBus.handlers[sessionId]) {
    try {
      console.log('trying to register', token, sessionId)
      eventBus.registerHandler(sessionId, (_, { body }) => {
        if (body.msg_type === 'CMD_MSG') onNewCmd(body)
        else messageHandler(onNewMsg)(body)
      })
    } catch (err) {
      console.error(err)
    }

    sendAuthInit({ token })

    eventBus.send('address.inbound', {
      data: makeAuthInitData({ sessionId, token }),
    })

    onSendMessage = createSendMessage(token)

    urlStateManager(onSendMessage)(window.location.pathname)
  }

  return null
}

export default VertxContainer
export { onSendMessage, onSendAnswer, onSendSearch, onSendFilter }
