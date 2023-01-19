import { isNotNullOrUndefinedOrEmpty } from 'utils/helpers/is-null-or-undefined.js'
import { selectFieldMessage } from 'redux/app/selectors'
import { useSelector } from 'react-redux'

const useGetFieldMessage = (parentQuestionCode, individualQuestionCode) => {
  const fieldMessageObject = useSelector(selectFieldMessage)
  const fieldMessage = fieldMessageObject[`QUE_ADD_HOST_CPY@${individualQuestionCode}`]
  let hasFieldMessage = isNotNullOrUndefinedOrEmpty(fieldMessage)

  // console.log('%c QUESTION CODE==>','background: tomato; padding 15px', {individualQuestionCode, parentQuestionCode})
  console.log('FIELD MESSAGE==>', { fieldMessageObject, hasFieldMessage, fieldMessage })

  return { hasFieldMessage, fieldMessage }
}

export default useGetFieldMessage
