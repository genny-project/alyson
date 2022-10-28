import { compose } from 'ramda'
import { useSelector } from 'react-redux'
import { selectCodeUnary } from 'redux/db/selectors'

const getAssociatedObjectListFromQuestionGroup = questionGroupCode =>
  compose(useSelector, selectCodeUnary(questionGroupCode))

export default getAssociatedObjectListFromQuestionGroup
