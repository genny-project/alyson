import { __, equals } from 'ramda'

import { complete } from 'utils/constants'
import convertToUppercase from 'utils/formatters/uppercase-convert'
import { selectCode } from 'redux/db/selectors'
import { useSelector } from 'react-redux'

const isComplete = equals(__, complete)

const useGetMenteeInformation = () => {
  const userCode = useSelector(selectCode('USER'))
  const profileStatus = convertToUppercase(
    useSelector(selectCode(userCode, 'PRI_PROFILE'))?.valueString,
  )
  const trainingStatus = convertToUppercase(
    useSelector(selectCode(userCode, 'PRI_TRAINING_STATUS'))?.valueString,
  )
  const selectMentorStatus = convertToUppercase(
    useSelector(selectCode(userCode, 'PRI_MATCHED_WITH_MENTOR'))?.valueString,
  )
  const meetingWithMentorStatus = convertToUppercase(
    useSelector(selectCode(userCode, 'PRI_MEETING_WITH_MENTOR'))?.valueString,
  )

  const isProfileCompleted = isComplete(profileStatus)
  const isTrainingCompleted = isComplete(trainingStatus)
  const isMentorSelected = isComplete(selectMentorStatus)
  const isMeetingCompleted = isComplete(meetingWithMentorStatus)

  return {
    profileStatus,
    trainingStatus,
    selectMentorStatus,
    meetingWithMentorStatus,
    isProfileCompleted,
    isTrainingCompleted,
    isMentorSelected,
    isMeetingCompleted,
  }
}

export default useGetMenteeInformation
