import DetailView from './detailView'
import { Grid } from '@chakra-ui/layout'
import Invites from './invites'
import Meetings from './meetings'
import Timeline from 'app/layouts/dashboard/timeline'
import useGetMentorInformation from './helpers/get-mentor-information'
import useGetMentorTimelineItems from 'app/layouts/dashboard/mentor/helpers/get-timeline-items'
import { useMobileValue } from 'utils/hooks'
import { useState } from 'react'

const MentorDashboard = () => {
  const { items } = useGetMentorTimelineItems()
  const { mentorStatus } = useGetMentorInformation()
  const [showDetailView, setShowDetailView] = useState(false)
  const [currentMentee, setCurrentMentee] = useState(null)

  const templateColumns = useMobileValue(['1fr', 'minmax(35rem, 1fr) 1fr'])

  return (
    <Grid paddingX="10" gap={'1rem'} templateColumns={templateColumns}>
      <Timeline items={items} />

      {mentorStatus === 'ACCEPTED' || mentorStatus === 'MATCHED' ? (
        <Meetings mentorStatus={mentorStatus} />
      ) : showDetailView && currentMentee ? (
        <DetailView setShowDetailView={setShowDetailView} currentMentee={currentMentee} />
      ) : mentorStatus === 'INVITED' ? (
        <Invites setShowDetailView={setShowDetailView} setCurrentMentee={setCurrentMentee} />
      ) : (
        <></>
      )}
    </Grid>
  )
}

export default MentorDashboard
