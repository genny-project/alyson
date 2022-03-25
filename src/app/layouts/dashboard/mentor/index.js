import DetailView from './detailView'
import { Flex } from '@chakra-ui/layout'
import Invites from './invites'
import Meetings from './meetings'
import Timeline from 'app/layouts/dashboard/timeline'
import useGetMentorInformation from './helpers/get-mentor-information'
import useGetMentorTimelineItems from 'app/layouts/dashboard/mentor/helpers/get-timeline-items'
import { useState } from 'react'

const MentorDashboard = () => {
  const { items } = useGetMentorTimelineItems()
  const { verifiedStatus } = useGetMentorInformation()
  const [showDetailView, setShowDetailView] = useState(false)
  const [currentMentee, setCurrentMentee] = useState(null)

  return (
    <Flex paddingX="10">
      <Timeline items={items} />

      {verifiedStatus === 'ACCEPTED' ? (
        <Meetings />
      ) : showDetailView && currentMentee ? (
        <DetailView setShowDetailView={setShowDetailView} currentMentee={currentMentee} />
      ) : verifiedStatus === 'MATCHED' ? (
        <Invites setShowDetailView={setShowDetailView} setCurrentMentee={setCurrentMentee} />
      ) : (
        ''
      )}
    </Flex>
  )
}

export default MentorDashboard
