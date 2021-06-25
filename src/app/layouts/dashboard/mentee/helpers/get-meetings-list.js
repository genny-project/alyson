import { useSelector } from 'react-redux'
import { includes, find, pathOr, map } from 'ramda'

import { selectDashboard } from 'redux/app/selectors'
import { selectCode, selectRows } from 'redux/db/selectors'

const useGetMeetingList = () => {
  const dashboardSbes = useSelector(selectDashboard)
  const meetingsSbe = dashboardSbes && find(includes('_APPLICATION_'))(dashboardSbes)
  const meetingRows = useSelector(selectRows(meetingsSbe))
  const applicationCode = pathOr([], [0])(meetingRows)

  const meetingOne = useSelector(selectCode(applicationCode, 'PRI_MENTORING_MEETING_1'))?.value
  const meetingTwo = useSelector(selectCode(applicationCode, 'PRI_MENTORING_MEETING_2'))?.value
  const meetingThree = useSelector(selectCode(applicationCode, 'PRI_MENTORING_MEETING_3'))?.value
  const meetingFour = useSelector(selectCode(applicationCode, 'PRI_MENTORING_MEETING_4'))?.value
  const meetingFive = useSelector(selectCode(applicationCode, 'PRI_MENTORING_MEETING_5'))?.value
  const meetingSix = useSelector(selectCode(applicationCode, 'PRI_MENTORING_MEETING_6'))?.value
  const meetingSeven = useSelector(selectCode(applicationCode, 'PRI_MENTORING_MEETING_7'))?.value
  const meetingEight = useSelector(selectCode(applicationCode, 'PRI_MENTORING_MEETING_8'))?.value
  const meetingNine = useSelector(selectCode(applicationCode, 'PRI_MENTORING_MEETING_9'))?.value
  const meetingTen = useSelector(selectCode(applicationCode, 'PRI_MENTORING_MEETING_10'))?.value
  const meetingEleven = useSelector(selectCode(applicationCode, 'PRI_MENTORING_MEETING_11'))?.value
  const meetingTwelve = useSelector(selectCode(applicationCode, 'PRI_MENTORING_MEETING_12'))?.value

  const allMeetings = [
    {
      text: meetingOne,
      link: 'https://www.google.com',
      completed: true,
    },
    {
      text: meetingTwo,
      link: 'https://www.google.com',
      completed: false,
    },
    {
      text: meetingThree,
      link: 'https://www.google.com',
      completed: false,
    },
    {
      text: meetingFour,
      link: 'https://www.google.com',
      completed: false,
    },
    {
      text: meetingFive,
      link: 'https://www.google.com',
      completed: false,
    },
    {
      text: meetingSix,
      link: 'https://www.google.com',
      completed: false,
    },
    {
      text: meetingSeven,
      link: 'https://catcafemelbourne.com/',
      completed: false,
    },
    {
      text: meetingEight,
      link: 'https://www.google.com',
      completed: false,
    },
    {
      text: meetingNine,
      link: 'https://www.google.com',
      completed: false,
    },
    {
      text: meetingTen,
      link: 'https://www.google.com',
      completed: false,
    },
    {
      text: meetingEleven,
      link: 'https://www.google.com',
      completed: false,
    },
    {
      text: meetingTwelve,
      link: 'https://www.google.com',
      completed: false,
    },
  ]

  const checkForUndefinedMeeting = map(({ text }) => text)(allMeetings)
  const hasUndefinedMeetings = includes(undefined)(checkForUndefinedMeeting)

  return { allMeetings, hasUndefinedMeetings }
}

export default useGetMeetingList
