import AlumniPage from 'app/layouts/dashboard/mentee/alumni'
import DetailView from 'app/layouts/dashboard/mentee/detailView'
import { Flex } from '@chakra-ui/layout'
import Meetings from 'app/layouts/dashboard/mentee/meetings'
import ProvidedTimings from './providedTimings'
import Recommendation from 'app/layouts/dashboard/mentee/recommendations'
import Timeline from 'app/layouts/dashboard/timeline'
import getMenteeTimelineItems from 'app/layouts/dashboard/mentee/helpers/get-timeline-items'
import useGetMenteeInformation from 'app/layouts/dashboard/mentee/helpers/get-mentee-information'
import { useState } from 'react'

const MenteeDashboard = () => {
  const {
    isMentorSelected,
    isTrainingCompleted,
    isMeetingCompleted,
    menteeStatus,
  } = useGetMenteeInformation()
  const [showDetailView, setShowDetailView] = useState(false)
  const [currentMentor, setCurrentMentor] = useState(null)

  const { items } = getMenteeTimelineItems()

  return (
    <Flex paddingX="10">
      <Timeline items={items} />
      {menteeStatus === 'PENDING_SELECT_DATE' ? (
        <ProvidedTimings />
      ) : isMentorSelected && !isMeetingCompleted ? (
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
