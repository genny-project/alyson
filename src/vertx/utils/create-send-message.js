import { eventBus } from 'vertx'
import log from 'utils/log'

const createSendMessage = (token, onSendMsg) => (data, options = {}) => {
  const { msg_type = 'EVT_MSG', event_type = 'BTN_CLICK', redirect = true, ...rest } = options

  const message = {
    data: {
      ...(Array.isArray(data) ? { items: data } : { data }),
      token,
      msg_type,
      event_type,
      redirect,
      ...rest,
    },
  }

  if (eventBus.state) {
    try {
      log(`⬆️ SENDING ${msg_type}`, message, 'color: darkSalmon;padding: 60px;')
      eventBus.send('address.inbound', message)
      onSendMsg(message)
    } catch (error) {
      window.location.reload()
    }
  }
}

export default createSendMessage
