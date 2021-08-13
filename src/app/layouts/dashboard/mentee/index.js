import { useState } from 'react'
import { Flex } from '@chakra-ui/layout'

import Timeline from 'app/layouts/dashboard/timeline'
import Meetings from 'app/layouts/dashboard/mentee/meetings'
import Recommendation from 'app/layouts/dashboard/mentee/recommendations'
import DetailView from 'app/layouts/dashboard/mentee/detailView'
import AlumniPage from 'app/layouts/dashboard/mentee/alumni'
import useGetMenteeInformation from 'app/layouts/dashboard/mentee/helpers/get-mentee-information'
import getMenteeTimelineItems from 'app/layouts/dashboard/mentee/helpers/get-timeline-items'

const MenteeDashboard = () => {
  const { isMentorSelected, isTrainingCompleted, isMeetingCompleted } = useGetMenteeInformation()
  const [showDetailView, setShowDetailView] = useState(false)
  const [currentMentor, setCurrentMentor] = useState(null)

  const { items } = getMenteeTimelineItems()

  return (
    <Flex paddingX="10">
      <Timeline items={items} />
      {isMentorSelected && !isMeetingCompleted ? (
        <Meetings />
      ) : showDetailView && isTrainingCompleted && currentMentor ? (
        <DetailView setShowDetailView={setShowDetailView} currentMentor={currentMentor} />
      ) : isTrainingCompleted && !isMentorSelected ? (
        <Recommendation setShowDetailView={setShowDetailView} setCurrentMentor={setCurrentMentor} />
      ) : isMeetingCompleted ? (
        <AlumniPage />
      ) : (
        <div />
      )}
    </Flex>
  )
}
export default MenteeDashboard
