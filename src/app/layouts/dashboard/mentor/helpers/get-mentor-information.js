import { __, equals } from 'ramda'

import { complete } from 'utils/constants'
import convertToUppercase from 'utils/formatters/uppercase-convert'
import { selectCode } from 'redux/db/selectors'
import { useSelector } from 'react-redux'

const isComplete = equals(__, complete)

const useGetMentorInformation = () => {
  const userCode = useSelector(selectCode('USER'))
  let profileStatus = useSelector(selectCode(userCode, 'PRI_PROFILE'))?.valueString
  let trainingStatus = useSelector(selectCode(userCode, 'PRI_TRAINING_STATUS'))?.valueString
  let isProfileCompleted = isComplete(profileStatus)

  profileStatus = convertToUppercase(profileStatus)
  trainingStatus = convertToUppercase(profileStatus)

  return {
    profileStatus,
    trainingStatus,
    isProfileCompleted,
  }
}

export default useGetMentorInformation
