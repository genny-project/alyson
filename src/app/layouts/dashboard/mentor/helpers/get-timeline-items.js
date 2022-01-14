import useGetMentorInformation from './get-mentor-information'

const useGetMentorTimelineItems = () => {
  const {
    profileStatus,
    trainingStatus,
    isProfileCompleted,
    isStatusVerified,
    verifiedStatus,
  } = useGetMentorInformation()

  const isButtonEnabled = isProfileCompleted && isStatusVerified

  const items = [
    {
      title: 'Register',
      description: 'Register to the platform.',
      buttonText: 'Register',
      completed: 'COMPLETE',
      isDisabled: true,
    },
    {
      title: 'Complete Profile',
      description: 'Please complete your profile before you can proceed!',
      buttonText: 'Go to Profile',
      completed: profileStatus,
      code: 'ACT_GO_TO_MENTOR_PROFILE',
      parentCode: 'BTN_CLICK',
    },
    {
      title: 'Complete Training',
      description: 'Access different training modules under this section.',
      buttonText: 'Go to Training',
      completed: trainingStatus,
      isDisabled: !isButtonEnabled && !isProfileCompleted,
      code: 'ACT_PRI_EVENT_START_MENTOR_TRAINING',
      status: verifiedStatus,
    },
  ]

  return {
    items,
  }
}

export default useGetMentorTimelineItems
