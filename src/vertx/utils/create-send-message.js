import { isArray } from 'utils/helpers/is-type'
import showLogs from 'utils/helpers/show-logs'
import log from 'utils/log'
import { eventBus } from 'vertx'

const createSendMessage = (token, onSendMsg) => (data, options = {}, receipientCodes) => {
  const showConsoleLogs = showLogs
  const {
    msg_type = 'EVT_MSG',
    event_type = 'BTN_CLICK',
    redirect = true,
    recipientCodeArray = receipientCodes,
    ...rest
  } = options

  const message = {
    data: {
      ...(isArray(data) ? { items: data } : { data }),
      token,
      msg_type,
      event_type,
      redirect,
      recipientCodeArray,
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

      eventBus.send('address.inbound', message, { Authorization: `Bearer ${token}` })
      onSendMsg(message)
    } catch (error) {
      window.location.reload()
    }
  }
}

export default createSendMessage
