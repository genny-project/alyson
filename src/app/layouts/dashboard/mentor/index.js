import { Box, Grid } from '@chakra-ui/layout'
import { equals, find, includes, not } from 'ramda'

import DashboardMessages from '../dashboard_msg/index'
import Invites from './invites'
import Meetings from './meetings'
import MenteeDetailView from './menteeDetailView'
import Timeline from 'app/layouts/dashboard/timeline'
import { selectCode } from 'redux/db/selectors'
import { selectDashboard } from 'redux/app/selectors'
import useGetMentorInformation from './helpers/get-mentor-information'
import useGetMentorTimelineItems from 'app/layouts/dashboard/mentor/helpers/get-timeline-items'
import { useMobileValue } from 'utils/hooks'
import { useSelector } from 'react-redux'
import { useState } from 'react'

const MentorDashboard = () => {
  const { items } = useGetMentorTimelineItems()
  const { mentorStatus } = useGetMentorInformation()
  const [showDetailView, setShowDetailView] = useState(false)
  const [currentMentee, setCurrentMentee] = useState(null)

  const dashboardSbes = useSelector(selectDashboard)
  const labelSbes = find(includes('_LABEL'))(dashboardSbes)
  const labelCode = useSelector(selectCode(labelSbes, 'PRI_CODE'))?.value

  const templateColumns = useMobileValue(['1fr', 'minmax(35rem, 1fr) 1fr'])

  return (
    <Grid paddingX="10" gap={'1rem'} templateColumns={templateColumns} alignItems={'start'}>
      <Box h={'calc(100% + 5rem)'} pt={10} paddingInline={10} mt={-10}>
        <Timeline items={items} setShowDetailView={setShowDetailView} />
      </Box>

      <Box mt={useMobileValue(['10', ''])} position="sticky" top="5vh" paddingInline={10}>
        {labelCode && <DashboardMessages labelCode={labelCode} />}
        {equals('MENTORING', mentorStatus) ||
        (equals('MATCHED', mentorStatus) && !showDetailView) ? (
          <Meetings
            mentorStatus={mentorStatus}
            setShowDetailView={setShowDetailView}
            setCurrentMentee={setCurrentMentee}
          />
        ) : showDetailView && currentMentee ? (
          <MenteeDetailView setShowDetailView={setShowDetailView} currentMentee={currentMentee} />
        ) : equals('INVITED', mentorStatus) && not(equals('LAB_MENTOR_MNG_ACCEPTED', labelCode)) ? (
          <Invites setShowDetailView={setShowDetailView} setCurrentMentee={setCurrentMentee} />
        ) : (
          <></>
        )}
      </Box>
    </Grid>
  )
}

export default MentorDashboard
