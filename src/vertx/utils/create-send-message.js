import { eventBus } from 'vertx'
import log from 'utils/log'
import showLogs from 'utils/helpers/show-logs'

const createSendMessage = (token, onSendMsg) => (data, options = {}) => {
  const showConsoleLogs = showLogs()
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
      if (showConsoleLogs) {
        console.groupEnd()
        if (options.data_type === 'Answer') {
          console.group(`⬆️ SENDING Answer - ${data[0]?.attributeCode} - ${data[0]?.value}`)
          log(
            `⬆️ SENDING Answer - ${data[0]?.attributeCode} - ${data[0]?.value}`,
            message,
            'color: lightBlue;padding: 60px;font-size: 1rem;',
          )
        } else {
          console.group(`⬆️ SENDING ${msg_type} - ${event_type} - ${data.code || data.value || ''}`)

          log(
            `⬆️ SENDING ${msg_type} - ${event_type} - ${data.code || data.value || ''}`,
            message,
            'color: darkSalmon;padding: 60px;',
          )
        }
      }

      eventBus.send('address.inbound', message)
      onSendMsg(message)
    } catch (error) {
      window.location.reload()
    }
  }
}

export default createSendMessage
