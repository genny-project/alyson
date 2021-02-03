import { onSendMessage } from 'vertx'

const sendAskClick = (parentCode, code) => onSendMessage({ parentCode, code })

export default sendAskClick
