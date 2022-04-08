import { __, equals } from 'ramda'

import { complete } from 'utils/constants'
import convertToUppercase from 'utils/formatters/uppercase-convert'
import { selectCode } from 'redux/db/selectors'
import { useSelector } from 'react-redux'

const isComplete = equals(__, complete)

const useGetMenteeInformation = () => {
  const userCode = useSelector(selectCode('USER'))

  let profileStatus = useSelector(selectCode(userCode, 'PRI_PROFILE'))?.valueString
  let trainingStatus = useSelector(selectCode(userCode, 'PRI_TRAINING_STATUS'))?.valueString
  let selectMentorStatus = useSelector(selectCode(userCode, 'PRI_MATCHED_WITH_MENTOR'))?.valueString
  let meetingWithMentorStatus = useSelector(selectCode(userCode, 'PRI_MEETING_WITH_MENTOR'))
    ?.valueString
  let menteeStatus = useSelector(selectCode(userCode, 'PRI_STATUS'))?.valueString

  profileStatus = convertToUppercase(profileStatus)
  trainingStatus = convertToUppercase(trainingStatus)
  selectMentorStatus = convertToUppercase(selectMentorStatus)
  meetingWithMentorStatus = convertToUppercase(meetingWithMentorStatus)
  menteeStatus = convertToUppercase(menteeStatus)

  const isProfileCompleted = isComplete(profileStatus)
  const isTrainingCompleted = isComplete(trainingStatus)
  const isMentorSelected = isComplete(selectMentorStatus)
  const isMeetingCompleted = isComplete(meetingWithMentorStatus)

  const isPendingSelectDate = equals(menteeStatus, 'PENDING_SELECT_DATE')
  const isInvited = equals(menteeStatus, 'INVITED')

  return {
    profileStatus,
    trainingStatus,
    selectMentorStatus,
    meetingWithMentorStatus,
    isProfileCompleted,
    isTrainingCompleted,
    isMentorSelected,
    isMeetingCompleted,
    isPendingSelectDate,
    menteeStatus,
    isInvited,
  }
}

export default useGetMenteeInformation
