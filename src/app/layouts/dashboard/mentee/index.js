import { useState } from 'react'
import { Flex } from '@chakra-ui/layout'
import { useSelector } from 'react-redux'

import Timeline from 'app/layouts/dashboard/timeline/timeline'
import Meetings from 'app/layouts/dashboard/timeline/meetings'
import Recommendation from 'app/layouts/dashboard/timeline/recommendations'
import DetailView from 'app/layouts/dashboard/timeline/detailView'
import AlumniPage from 'app/layouts/dashboard/timeline/alumni'
import LinkedApp from './linked_app'
import { selectCode } from 'redux/db/selectors'

import useGetMenteeInformation from 'app/layouts/dashboard/timeline/helpers/get-mentee-information'

const MenteeDashboard = () => {
  const userCode = useSelector(selectCode('USER'))
  const linkedApp = useSelector(selectCode(userCode, 'PRI_APP_LNK_CODE'))

  const { isMentorSelected, isTrainingCompleted, isMeetingCompleted } = useGetMenteeInformation()
  const [showDetailView, setShowDetailView] = useState(false)
  const [currentMentor, setCurrentMentor] = useState(null)
  const menteeProps = {
    isMentorSelected,
  }

  if (linkedApp?.value) return <LinkedApp code={linkedApp.value} />

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
