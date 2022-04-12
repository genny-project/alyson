import useGetMenteeInformation from './get-mentee-information'

const useGetMenteeTimelineItems = () => {
  const {
    userCode,
    profileStatus,
    trainingStatus,
    meetingWithMentorStatus,
    isTrainingCompleted,
    isMentorSelected,
    isMeetingCompleted,
    menteeStatus,
    isPendingSelectDate,
    selectMentorStatus,
    isProfileCompleted,
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
      code: 'ACT_GO_TO_PROFILE',
      parentCode: 'BTN_CLICK',
    },
    {
      title: 'Complete Training',
      description: 'Access different training modules under this section.',
      buttonText: 'Go to Training',
      completed: trainingStatus,
      isDisabled: isProfileCompleted && isTrainingCompleted,
      code: 'ACT_PRI_EVENT_START_MENTEE_TRAINING',
      trainingStatus: trainingStatus,
    },
    {
      title: 'Select Mentor',
      description: 'Choose the Mentor that suits you the most!',
      buttonText: isMentorSelected ? 'Mentor Selected' : 'Go to Mentor Selection',
      completed: selectMentorStatus,
      isDisabled: !isTrainingCompleted || isMentorSelected,
      code: 'ACT_PRI_EVENT_SELECT_MENTOR',
      targetCode: userCode,
      invitationStatus: menteeStatus,
    },
    {
      title: 'Introductory Meeting with Mentor',
      description: 'Select one of the dates proposed by your potential mentor',
      buttonText: isPendingSelectDate ? 'Date Selected' : 'Select Date',
      completed: isPendingSelectDate ? 'INCOMPLETE' : 'COMPLETE' && selectMentorStatus,
      isDisabled: !isPendingSelectDate,
      targetCode: userCode,
      code: 'ACT_SELECT_DATE',
      pendingDateSelected: isPendingSelectDate,
    },
    {
      title: '12 Meetings with Mentors',
      description: 'Meet and Greet witht the mentors',
      buttonText: 'Meet & Greet',
      completed: meetingWithMentorStatus,
      isDisabled: !isMentorSelected || menteeStatus === 'MATCHED',
      code: 'ACT_PRI_EVENT_SCHEDULE_MENTORING',
      parentCode: 'SBE_APPLICATIONS_MEETING',
      targetCode: userCode,
      status: menteeStatus,
    },
    {
      title: 'MentorMatch Alumni',
      description: 'Welcome to Alumni',
      buttonText: 'Alumni',
      completed: 'INCOMPLETE',
      isDisabled: !isMeetingCompleted,
    },
  ]

  return {
    items,
  }
}

export default useGetMenteeTimelineItems
