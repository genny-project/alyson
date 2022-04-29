import { Box, Grid, Text } from '@chakra-ui/layout'
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
  const templateColumns = useMobileValue(['1fr', 'minmax(max-content, 655px) 1fr'])
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

  const userCode = useSelector(selectCode('USER'))
  const userFirstName = useSelector(selectCode(userCode, 'PRI_FIRSTNAME'))?.value

  return (
    <Grid templateColumns={templateColumns} gap={'3rem'} alignItems={'start'}>
      <Box p={10} mt={'-2.5rem'} bg={'gray.50'} boxShadow={`0.5rem -2px 1.5rem rgba(0,0,0,0.07)`}>
        <Timeline items={items} setShowDetailView={setShowDetailView} />
      </Box>

      <Box position="sticky" top="10vh" paddingInline={10}>
        <Text textStyle={'head.1'} paddingBottom={9}>
          {`Welcome, ${userFirstName}`}
        </Text>

        <Box w={'full'} h={'1px'} bg={'gray.700'} mb={12}></Box>

        {labelCode && <DashboardMessages labelCode={labelCode} />}

        {equals('INVITED', menteeStatus) && invitedMentors ? (
          <BookedTiming invitedMentors={invitedMentors} menteeStatus={menteeStatus} />
        ) : not(equals('PENDING', menteeStatus)) &&
          not(equals('TRAINING', menteeStatus)) &&
          not(equals('AWAITING_SELECT_DATETIME_MENTORING', menteeStatus)) &&
          not(equals('MENTORING', menteeStatus)) &&
          not(equals('AVAILABLE', menteeStatus)) ? (
          <ProvidedTimings labelCode={labelCode} />
        ) : isMentorSelected && !isMeetingCompleted ? (
          <>
            <Meetings labelCode={labelCode} />
            <ProvidedTimings labelCode={labelCode} />
          </>
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
      </Box>
    </Grid>
  )
}
export default MenteeDashboard
