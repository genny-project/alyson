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
  let mentorStatus = useSelector(selectCode(userCode, 'PRI_STATUS'))?.valueString

  profileStatus = convertToUppercase(profileStatus)
  trainingStatus = convertToUppercase(trainingStatus)
  mentorStatus = convertToUppercase(mentorStatus)

  const isProfileCompleted = isComplete(profileStatus)
  const isTrainingCompleted = isComplete(trainingStatus)
  const isStatusVerified = equals(mentorStatus, 'VERIFIED')
  const isMatchedStatus = equals(mentorStatus, 'MATCHED')
  const isInvitedStatus = equals(mentorStatus, 'INVITED')

  return {
    userCode,
    profileStatus,
    trainingStatus,
    mentorStatus,
    isProfileCompleted,
    isStatusVerified,
    isMatchedStatus,
    isInvitedStatus,
    isTrainingCompleted,
  }
}

export default useGetMentorInformation
