import { equals, __ } from 'ramda'
import { useSelector } from 'react-redux'

import { selectCode } from 'redux/db/selectors'
import { complete } from 'utils/constants'

const isComplete = equals(__, complete)

const useGetMentorInformation = () => {
  const userCode = useSelector(selectCode('USER'))
  const profileStatus = useSelector(selectCode(userCode, 'PRI_USER_PROFILE'))?.valueString
  const trainingStatus = useSelector(selectCode(userCode, 'PRI_TRAINING_STATUS'))?.valueString
  const isProfileCompleted = isComplete(profileStatus)

  return {
    profileStatus,
    trainingStatus,
    isProfileCompleted,
  }
}

export default useGetMentorInformation
