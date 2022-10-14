import { useSelector } from 'react-redux'
import { faCheckCircle, faTimesCircle } from '@fortawesome/free-solid-svg-icons'
import { FontAwesomeIcon } from '@fortawesome/react-fontawesome'

import { maxNumberOfRetries, ACKMESSAGEKEY } from 'utils/constants'
import { isNotStringifiedEmptyArray } from 'utils/functionals'
import { selectCode } from 'redux/db/selectors'
import { compose } from 'ramda'

const AnswerAcknowledge = ({
  failedValidation,
  userInput,
  retrySendingAnswerRef,
  questionCode,
}) => {
  const ackMessageObject = compose(useSelector, selectCode)(ACKMESSAGEKEY)

  const ackMessageValue = ackMessageObject?.[questionCode] || ''

  return !failedValidation && userInput && isNotStringifiedEmptyArray(userInput) ? (
    !!ackMessageValue ? (
      <FontAwesomeIcon opacity="0.5" color="green" icon={faCheckCircle} />
    ) : retrySendingAnswerRef.current < maxNumberOfRetries ? (
      <FontAwesomeIcon opacity="0.5" color="orange" icon={faCheckCircle} />
    ) : (
      <FontAwesomeIcon opacity="0.5" color="red" icon={faTimesCircle} />
    )
  ) : null
}

export default AnswerAcknowledge
