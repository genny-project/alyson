import { __, equals } from 'ramda'

import { complete } from 'utils/constants'
import { selectCode } from 'redux/db/selectors'
import { useSelector } from 'react-redux'

const isComplete = equals(__, complete)

const useGetMentorInformation = () => {
  const userCode = useSelector(selectCode('USER'))
  const profileStatus = useSelector(selectCode(userCode, 'PRI_PROFILE'))?.valueString
  const trainingStatus = useSelector(selectCode(userCode, 'PRI_TRAINING_STATUS'))?.valueString
  const isProfileCompleted = isComplete(profileStatus)

  return {
    profileStatus,
    trainingStatus,
    isProfileCompleted,
  }
}

export default useGetMentorInformation
