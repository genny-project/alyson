import useGetMentorInformation from './get-mentor-information'

const useGetMentorTimelineItems = () => {
  const {
    profileStatus,
    trainingStatus,
    isProfileCompleted,
    verifiedStatus,
    isInvitedStatus,
    mentorStatus,
  } = useGetMentorInformation()

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
      isDisabled: !isProfileCompleted,
      code: 'ACT_PRI_EVENT_START_MENTOR_TRAINING',
      status: verifiedStatus,
    },
    {
      title: `Meet & Greet Invites`,
      description: 'View all the invites from mentees.',
      buttonText: 'View Invite',
      completed: trainingStatus,
      isDisabled: !isInvitedStatus,
      code: 'ACT_SHOW_MENTEE_MNG_INVITES',
      mentorStatus: mentorStatus,
    },
  ]

  return {
    items,
  }
}

export default useGetMentorTimelineItems
