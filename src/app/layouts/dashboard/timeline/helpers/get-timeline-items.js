import useGetMenteeInformation from './get-mentee-information'

const useGetMenteeTimelineItems = () => {
  const {
    profileStatus,
    trainingStatus,
    selectMentorStatus,
    firstMeetingStatus,
  } = useGetMenteeInformation()
  const description =
    'Lorem ipsum dolor sit amet, consectetur adipiscing elit. Suspendisse venenatis placerat arcu, tempor rutrum tortor porta quis. Donec aliquam urna ac varius ultrices. Morbi vel dapibus nunc, dictum pretium justo. Nulla non blandit leo. Proin non imperdiet ex. Etiam cursus dignissim sem, nec interdum massa pellentesque eu. Proin condimentum mauris at diam porttitor, a rhoncus nisi semper. Sed sed tincidunt felis, at bibendum sapien. Etiam odio libero, pretium ac condimentum ac, congue ac mi. Aenean efficitur malesuada arcu mattis tempus.'
  const isTrainingCompleted = trainingStatus === 'COMPLETED'
  const isProfileCompleted = profileStatus === 'COMPLETED'
  const isMentorSelected = selectMentorStatus === 'COMPLETED'
  const isFirstMeetingCompleted = firstMeetingStatus === 'COMPLETED'
  const items = [
    {
      title: 'Complete Profile',
      description: 'Please complete your profile before you can proceed!',
      buttonText: 'Go to Profile',
      completed: 'COMPLETED',
      code: 'QUE_AVATAR_PROFILE_GRP',
      parentCode: 'QUE_AVATAR_GRP',
    },
    {
      title: 'Complete Training',
      description: 'Access different training modules under this section.',
      buttonText: 'Go to Training',
      completed: trainingStatus,
      isDisabled: !isTrainingCompleted,
      code: 'ACT_PRI_EVENT_START_MENTEE_TRAINING',
    },
    {
      title: 'Select Mentor',
      description: 'Choose the Mentor that suits you the most!',
      buttonText: 'Go to Mentor Selection',
      completed: 'NOT COMPLETED',
      isDisabled: !isProfileCompleted,
      code: 'ACT_PRI_EVENT_SELECT_MENTOR',
    },
    {
      title: 'First Meeting',
      description: description,
      buttonText: 'Select First Meeting',
      completed: 'NOT COMPLETED',
      isDisabled: !isMentorSelected,
    },
    {
      title: 'Meet and Greet',
      description: 'Meet and Greet witht the mentors',
      buttonText: 'Meet & Greet',
      completed: 'NOT COMPLETED',
      isDisabled: !isFirstMeetingCompleted,
    },
  ]

  return {
    items,
  }
}

export default useGetMenteeTimelineItems
