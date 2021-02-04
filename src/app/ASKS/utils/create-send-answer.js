import { onSendMessage } from 'vertx'

const getFormattedValue = value => (typeof value === 'object' ? JSON.stringify(value) : value)

const createSendAnswer = fieldData => value => {
  const { id: askId, attributeCode, sourceCode, targetCode, weight, questionCode } = fieldData

  onSendMessage(
    [
      {
        askId,
        attributeCode,
        sourceCode,
        targetCode,
        code: questionCode,
        identifier: questionCode,
        weight,
        value: getFormattedValue(value),
      },
    ],
    { msg_type: 'DATA_MSG', data_type: 'Answer', event_type: false },
  )
}

export default createSendAnswer
