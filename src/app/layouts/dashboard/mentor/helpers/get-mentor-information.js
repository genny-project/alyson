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
  let verifiedStatus = useSelector(selectCode(userCode, 'PRI_STATUS'))?.valueString

  profileStatus = convertToUppercase(profileStatus)
  trainingStatus = convertToUppercase(trainingStatus)
  verifiedStatus = convertToUppercase(verifiedStatus)

  const isProfileCompleted = isComplete(profileStatus)
  const isStatusVerified = equals(verifiedStatus, 'VERIFIED')

  return {
    profileStatus,
    trainingStatus,
    verifiedStatus,
    isProfileCompleted,
    isStatusVerified,
  }
}

export default useGetMentorInformation
