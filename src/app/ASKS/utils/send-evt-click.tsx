import { onSendMessage } from 'vertx'

interface EvtClickMessage {
  parentCode: string
  code: string
  sourceCode: string
  targetCode: string
  processId: string
  attributeCode: string
}

const sendEvtClick = (data: EvtClickMessage) => {
  onSendMessage(data)
}

export default sendEvtClick
