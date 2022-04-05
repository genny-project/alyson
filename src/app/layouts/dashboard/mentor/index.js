import { find, includes } from 'ramda'

import DashboardMessages from '../dashboard_msg'
import DetailView from './detailView'
import { Grid } from '@chakra-ui/layout'
import Invites from './invites'
import Meetings from './meetings'
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

  console.log(labelSbes)

  const templateColumns = useMobileValue(['1fr', 'minmax(35rem, 1fr) 1fr'])

  return (
    <Grid paddingX="10" gap={'1rem'} templateColumns={templateColumns} alignItems={'start'}>
      <Timeline items={items} />

      {mentorStatus === 'MENTORING' || mentorStatus === 'MATCHED' ? (
        <Meetings mentorStatus={mentorStatus} />
      ) : showDetailView && currentMentee ? (
        <DetailView setShowDetailView={setShowDetailView} currentMentee={currentMentee} />
      ) : mentorStatus === 'AVAILABLE' || labelCode ? (
        <DashboardMessages labelCode={labelCode} />
      ) : mentorStatus === 'INVITED' ? (
        <Invites setShowDetailView={setShowDetailView} setCurrentMentee={setCurrentMentee} />
      ) : (
        <></>
      )}
    </Grid>
  )
}

export default MentorDashboard
