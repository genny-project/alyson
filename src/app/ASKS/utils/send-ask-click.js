import { onSendMessage } from 'vertx'

const sendAskClick = (parentCode, code, rootCode, targetCode) =>
  onSendMessage({ parentCode, code, rootCode, targetCode })

export default sendAskClick
