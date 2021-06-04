import { onSendMessage } from 'vertx'

const getFormattedValue = value => (typeof value === 'object' ? JSON.stringify(value) : value)

const createSendAnswer = (fieldData, { passedTargetCode, setSaving } = {}) => value => {
  const { id: askId, attributeCode, sourceCode, targetCode, weight, questionCode } = fieldData

  if (setSaving) setSaving.on()
  onSendMessage(
    [
      {
        askId,
        attributeCode,
        sourceCode,
        targetCode: passedTargetCode || targetCode,
        code: questionCode,
        identifier: questionCode,
        weight,
        value: getFormattedValue(value),
      },
    ],
    { msg_type: 'DATA_MSG', data_type: 'Answer', event_type: false, redirect: false },
  )
}

export default createSendAnswer
