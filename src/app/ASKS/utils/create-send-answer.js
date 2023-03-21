import { isObject } from 'utils/helpers/is-type'
import { onSendMessage } from 'vertx'

const getFormattedValue = value => (isObject(value) ? JSON.stringify(value) : value)

const createSendAnswer = (fieldData, { passedTargetCode } = {}) => value => {
  const {
    id: askId,
    processId,
    attributeCode,
    sourceCode,
    targetCode,
    weight,
    questionCode,
    inferred = false,
  } = fieldData

  onSendMessage(
    [
      {
        askId,
        processId,
        attributeCode,
        sourceCode,
        targetCode: passedTargetCode || targetCode,
        code: questionCode,
        identifier: questionCode,
        weight,
        value: getFormattedValue(value),
        inferred,
      },
    ],
    { msg_type: 'DATA_MSG', data_type: 'Answer', event_type: false, redirect: false },
  )
}

export default createSendAnswer
