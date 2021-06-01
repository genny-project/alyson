import useGetMenteeInformation from './get-mentee-information'

const useGetMenteeTimelineItems = () => {
  const {
    profileStatus,
    trainingStatus,
    selectMentorStatus,
    meetingsWithMentorsStatus,
    isProfileCompleted,
    isTrainingCompleted,
    isMentorSelected,
    isFirstMeetingCompleted,
  } = useGetMenteeInformation()

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
      code: 'QUE_AVATAR_PROFILE_GRP',
      parentCode: 'QUE_AVATAR_GRP',
    },
    {
      title: 'Complete Training',
      description: 'Access different training modules under this section.',
      buttonText: 'Go to Training',
      completed: trainingStatus,
      isDisabled: !isProfileCompleted,
      code: 'ACT_PRI_EVENT_START_MENTEE_TRAINING',
    },
    {
      title: 'Select Mentor',
      description: 'Choose the Mentor that suits you the most!',
      buttonText: isMentorSelected ? 'Mentor Selected' : 'Go to Mentor Selection',
      completed: selectMentorStatus,
      isDisabled: !isTrainingCompleted || isMentorSelected,
      code: 'ACT_PRI_EVENT_SELECT_MENTOR',
    },
    {
      title: 'First Meeting',
      description: 'description',
      buttonText: 'Select First Meeting',
      completed: meetingsWithMentorsStatus,
      isDisabled: !isMentorSelected,
      code: 'ACT_PRI_EVENT_MENTORING_APPLICATION',
    },
    {
      title: '12 Meetings with Mentors',
      description: 'Meet and Greet witht the mentors',
      buttonText: 'Meet & Greet',
      completed: 'INCOMPLETE',
      isDisabled: !isFirstMeetingCompleted,
    },
    {
      title: 'MentorMatch Alumni',
      description: 'Welcome to Alumni',
      buttonText: 'Alumni',
      completed: 'INCOMPLETE',
      isDisabled: !isFirstMeetingCompleted,
    },
  ]

  return {
    items,
  }
}

export default useGetMenteeTimelineItems
