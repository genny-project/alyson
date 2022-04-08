import { Box, Grid } from '@chakra-ui/layout'
import { equals, find, includes, not } from 'ramda'
import { selectCode, selectRows } from 'redux/db/selectors'

import AlumniPage from 'app/layouts/dashboard/mentee/alumni'
import BookedTiming from './bookedTiming'
import DashboardMessages from '../dashboard_msg'
import DetailView from 'app/layouts/dashboard/mentee/detailView'
import Meetings from 'app/layouts/dashboard/mentee/meetings'
import ProvidedTimings from './providedTimings'
import Recommendation from 'app/layouts/dashboard/mentee/recommendations'
import Timeline from 'app/layouts/dashboard/timeline'
import getMenteeTimelineItems from 'app/layouts/dashboard/mentee/helpers/get-timeline-items'
import { selectDashboard } from 'redux/app/selectors'
import useGetMenteeInformation from 'app/layouts/dashboard/mentee/helpers/get-mentee-information'
import { useMobileValue } from 'utils/hooks'
import { useSelector } from 'react-redux'
import { useState } from 'react'

const MenteeDashboard = () => {
  const templateColumns = useMobileValue(['1fr', '1fr 1fr'])
  const {
    isMentorSelected,
    isTrainingCompleted,
    isMeetingCompleted,
    menteeStatus,
  } = useGetMenteeInformation()
  const [showDetailView, setShowDetailView] = useState(false)
  const [currentMentor, setCurrentMentor] = useState(null)

  const { items } = getMenteeTimelineItems()

  const dashboardSbes = useSelector(selectDashboard)

  const labelSbes = find(includes('_LABEL'))(dashboardSbes)
  const labelCode = useSelector(selectCode(labelSbes, 'PRI_CODE'))?.value

  const invitedMentorSbes = find(includes('_MENTOR_MNG_INVITED'))(dashboardSbes)
  const invitedMentors = useSelector(selectRows(invitedMentorSbes))

  return (
    <Grid templateColumns={templateColumns} alignItems={'start'} paddingX="10">
      <Timeline items={items} />
      {equals('INVITED', menteeStatus) && (labelCode || invitedMentors) ? (
        <Box>
          {labelCode && <DashboardMessages labelCode={labelCode} />}
          {invitedMentors && (
            <BookedTiming invitedMentors={invitedMentors} menteeStatus={menteeStatus} />
          )}
        </Box>
      ) : equals('PENDING_SELECT_DATE', menteeStatus) ? (
        <ProvidedTimings />
      ) : labelCode === 'LAB_INVITE_SENT' && not(equals('MENTORING', menteeStatus)) ? (
        <DashboardMessages labelCode={labelCode} />
      ) : isMentorSelected && !isMeetingCompleted ? (
        <Meetings />
      ) : showDetailView && isTrainingCompleted && currentMentor ? (
        <DetailView setShowDetailView={setShowDetailView} currentMentor={currentMentor} />
      ) : isTrainingCompleted && !isMentorSelected ? (
        <Recommendation
          setShowDetailView={setShowDetailView}
          setCurrentMentor={setCurrentMentor}
          menteeStatus={menteeStatus}
        />
      ) : isMeetingCompleted ? (
        <AlumniPage />
      ) : (
        <></>
      )}
    </Grid>
  )
}
export default MenteeDashboard
