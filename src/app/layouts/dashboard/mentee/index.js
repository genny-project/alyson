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
  const [showLinkedpplication, setShowLinkedApplication] = useState(true)

  const userCode = useSelector(selectCode('USER'))
  const linkedApp = useSelector(selectCode(userCode, 'PRI_APP_LNK_CODE'))

  const { isMentorSelected, isTrainingCompleted, isMeetingCompleted } = useGetMenteeInformation()
  const [showDetailView, setShowDetailView] = useState(false)
  const [currentMentor, setCurrentMentor] = useState(null)
  const menteeProps = {
    isMentorSelected,
  }

  const primaryAvailability = useSelector(selectCode(linkedApp, 'PRI_PRIMARY_AVAILABILITY'))
  const secondaryAvailability = useSelector(selectCode(linkedApp, 'PRI_SECONDARY_AVAILABILITY'))
  const tertiaryAvailability = useSelector(selectCode(linkedApp, 'PRI_TERTIARY_AVAILABILITY'))
  const availability = primaryAvailability && secondaryAvailability && tertiaryAvailability

  if (linkedApp?.value && showLinkedpplication && availability)
    return <LinkedApp code={linkedApp.value} setShowLinkedApplication={setShowLinkedApplication} />

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
