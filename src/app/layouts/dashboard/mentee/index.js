import { useState } from 'react'
import { Flex } from '@chakra-ui/layout'
import Timeline from 'app/layouts/dashboard/timeline/timeline'
import Meetings from 'app/layouts/dashboard/timeline/meetings'
import Recommendation from 'app/layouts/dashboard/timeline/recommendations'
import DetailView from 'app/layouts/dashboard/timeline/detailView'
import AlumniPage from 'app/layouts/dashboard/timeline/alumni'

import useGetMenteeInformation from 'app/layouts/dashboard/timeline/helpers/get-mentee-information'

const MenteeDashboard = () => {
  const { isMentorSelected, isTrainingCompleted, isMeetingCompleted } = useGetMenteeInformation()

  const [showDetailView, setShowDetailView] = useState(false)
  const [currentMentor, setCurrentMentor] = useState(null)
  const menteeProps = {
    isMentorSelected,
  }

  return (
    <Flex paddingX="10">
      <Timeline menteeProps={menteeProps} />
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
