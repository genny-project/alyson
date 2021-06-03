import { useSelector } from 'react-redux'
import { selectCode } from 'redux/db/selectors'

const isComplete = status => status === 'COMPLETE'

const useGetMenteeInformation = () => {
  const userCode = useSelector(selectCode('USER'))
  const profileStatus = useSelector(selectCode(userCode, 'PRI_PROFILE'))?.valueString
  const trainingStatus = useSelector(selectCode(userCode, 'PRI_TRAINING_STATUS'))?.valueString
  const selectMentorStatus = useSelector(selectCode(userCode, 'PRI_MATCHED_WITH_MENTOR'))
    ?.valueString
  const meetingsWithMentorsStatus = useSelector(selectCode(userCode, 'PRI_MEETING_WITH_MENTOR'))
    ?.valueString
  const isProfileCompleted = isComplete(profileStatus)
  const isTrainingCompleted = isComplete(trainingStatus)
  const isMentorSelected = isComplete(selectMentorStatus)

  return {
    profileStatus,
    trainingStatus,
    selectMentorStatus,
    meetingsWithMentorsStatus,
    isProfileCompleted,
    isTrainingCompleted,
    isMentorSelected,
  }
}

export default useGetMenteeInformation
