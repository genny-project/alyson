import { equals } from 'ramda'
import { useSelector } from 'react-redux'

import { selectCode } from 'redux/db/selectors'
import { complete } from 'utils/constants'

const isComplete = status => equals(status, complete)

const useGetMenteeInformation = () => {
  const userCode = useSelector(selectCode('USER'))
  const profileStatus = useSelector(selectCode(userCode, 'PRI_USER_PROFILE'))?.valueString
  const trainingStatus = useSelector(selectCode(userCode, 'PRI_TRAINING_STATUS'))?.valueString
  const selectMentorStatus = useSelector(selectCode(userCode, 'PRI_MATCHED_WITH_MENTOR'))
    ?.valueString
  const meetingWithMentorStatus = useSelector(selectCode(userCode, 'PRI_MEETING_WITH_MENTOR'))
    ?.valueString
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
