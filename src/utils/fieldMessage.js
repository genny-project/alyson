import { isNotNullOrUndefinedOrEmpty } from 'utils/helpers/is-null-or-undefined.js'
import { selectFieldMessage } from 'redux/app/selectors'
import { useSelector } from 'react-redux'

const useGetFieldMessage = (parentQuestionCode, individualQuestionCode) => {
  const fieldMessageObject = useSelector(selectFieldMessage)
  const fieldMessage = fieldMessageObject[`QUE_ADD_HOST_CPY@${individualQuestionCode}`]
  let hasFieldMessage = isNotNullOrUndefinedOrEmpty(fieldMessage)

  return { hasFieldMessage, fieldMessage }
}

export default useGetFieldMessage
