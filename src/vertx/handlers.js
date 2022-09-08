import { forEach } from 'ramda'
import log from 'utils/log'

export const messageHandler = onNewMsg => body => {
  console.log('testing=======>', { body, onNewMsg })
  if (body) {
    const { data_type, messages, aliasCode } = body
    log(`${aliasCode || data_type}`, body)

    if (data_type === 'QBulkMessage') {
      forEach(messageHandler(onNewMsg))(messages)
      return
    }

    onNewMsg(body)
  } else {
    console.error('[msg error]', body)
  }
}
