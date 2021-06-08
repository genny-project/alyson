import { useSelector } from 'react-redux'
import { includes, find } from 'ramda'

import { selectDashboard } from 'redux/app/selectors'
import { selectCode } from 'redux/db/selectors'

const useGetMeetingList = () => {
  const dashboardSbes = useSelector(selectDashboard)
  const meetingsSbe = dashboardSbes && find(includes('_APPLICATIONS_MEETING_'))(dashboardSbes)

  const meetingOne = useSelector(selectCode(meetingsSbe, 'COL_PRI_MENTORING_MEETING_1'))?.value
  const meetingTwo = useSelector(selectCode(meetingsSbe, 'COL_PRI_MENTORING_MEETING_2'))?.value
  const meetingThree = useSelector(selectCode(meetingsSbe, 'COL_PRI_MENTORING_MEETING_3'))?.value
  const meetingFour = useSelector(selectCode(meetingsSbe, 'COL_PRI_MENTORING_MEETING_4'))?.value
  const meetingFive = useSelector(selectCode(meetingsSbe, 'COL_PRI_MENTORING_MEETING_5'))?.value
  const meetingSix = useSelector(selectCode(meetingsSbe, 'COL_PRI_MENTORING_MEETING_6'))?.value
  const meetingSeven = useSelector(selectCode(meetingsSbe, 'COL_PRI_MENTORING_MEETING_7'))?.value
  const meetingEight = useSelector(selectCode(meetingsSbe, 'COL_PRI_MENTORING_MEETING_8'))?.value
  const meetingNine = useSelector(selectCode(meetingsSbe, 'COL_PRI_MENTORING_MEETING_9'))?.value
  const meetingTen = useSelector(selectCode(meetingsSbe, 'COL_PRI_MENTORING_MEETING_10'))?.value
  const meetingEleven = useSelector(selectCode(meetingsSbe, 'COL_PRI_MENTORING_MEETING_11'))?.value
  const meetingTwelve = useSelector(selectCode(meetingsSbe, 'COL_PRI_MENTORING_MEETING_12'))?.value

  const allMeetings = [
    {
      text: meetingOne,
      link: 'https://www.google.com',
      completed: true,
    },
    {
      text: meetingTwo,
      link: 'https://www.google.com',
      completed: true,
    },
    {
      text: meetingThree,
      link: 'https://www.google.com',
      completed: true,
    },
    {
      text: meetingFour,
      link: 'https://www.google.com',
      completed: true,
    },
    {
      text: meetingFive,
      link: 'https://www.google.com',
      completed: true,
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

  return { allMeetings }
}

export default useGetMeetingList
