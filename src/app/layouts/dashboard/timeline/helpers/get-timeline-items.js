import useGetMenteeInformation from './get-mentee-information'

const useGetMenteeTimelineItems = () => {
  const {
    profileStatus = 'COMPLETE',
    trainingStatus,
    selectMentorStatus,
    meetingsWithMentorsStatus,
  } = useGetMenteeInformation()
  const description =
    'Lorem ipsum dolor sit amet, consectetur adipiscing elit. Suspendisse venenatis placerat arcu, tempor rutrum tortor porta quis. Donec aliquam urna ac varius ultrices. Morbi vel dapibus nunc, dictum pretium justo. Nulla non blandit leo. Proin non imperdiet ex. Etiam cursus dignissim sem, nec interdum massa pellentesque eu. Proin condimentum mauris at diam porttitor, a rhoncus nisi semper. Sed sed tincidunt felis, at bibendum sapien. Etiam odio libero, pretium ac condimentum ac, congue ac mi. Aenean efficitur malesuada arcu mattis tempus.'
  const isProfileCompleted = profileStatus === 'COMPLETE'
  const isTrainingCompleted = trainingStatus === 'COMPLETE'
  const isMentorSelected = selectMentorStatus === 'COMPLETE'
  const isFirstMeetingCompleted = meetingsWithMentorsStatus === 'COMPLETE'
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
      buttonText: 'Go to Mentor Selection',
      completed: selectMentorStatus,
      isDisabled: !isTrainingCompleted,
      code: 'ACT_PRI_EVENT_SELECT_MENTOR',
    },
    {
      title: 'First Meeting',
      description: description,
      buttonText: 'Select First Meeting',
      completed: meetingsWithMentorsStatus,
      isDisabled: !isMentorSelected,
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
      buttonText: 'Meet & Greet',
      completed: 'INCOMPLETE',
      isDisabled: !isFirstMeetingCompleted,
    },
  ]

  return {
    items,
  }
}

export default useGetMenteeTimelineItems
