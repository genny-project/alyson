import { useDispatch } from 'react-redux'
import { compose } from 'ramda'
import { newCmd } from 'redux/app'

const useClearFieldMessage = (parentCode, attributeCode, questionCode) => {
  const dispatchPushMessage = useDispatch()
  const onNewCmd = compose(dispatchPushMessage, newCmd)

  const handleClearFieldMessage = () => {
    onNewCmd({
      cmd_type: 'FIELDMSG',
      questionCode,
      attributeCode,
      code: parentCode,
      message: {
        value: '',
      },
    })
  }

  return handleClearFieldMessage
}

export default useClearFieldMessage
