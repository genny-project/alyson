const makeAuthInitData = ({ token, sessionId }) => ({
  event_type: 'AUTH_INIT',
  msg_type: 'EVT_MSG',
  token,
  data: {
    code: 'AUTH_INIT',
    platform: { type: 'web' },
    sessionId,
  },
})

export default makeAuthInitData
