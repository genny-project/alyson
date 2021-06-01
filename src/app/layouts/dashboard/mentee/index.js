import { useState } from 'react'
import { Flex } from '@chakra-ui/layout'
import Timeline from 'app/layouts/dashboard/timeline/timeline'
import Meetings from 'app/layouts/dashboard/timeline/meetings'
import Recommendation from 'app/layouts/dashboard/timeline/recommendations'
import DetailView from 'app/layouts/dashboard/timeline/detailView'

import useGetMenteeInformation from 'app/layouts/dashboard/timeline/helpers/get-mentee-information'

const MenteeDashboard = () => {
  const { isMentorSelected } = useGetMenteeInformation()

  const [showDetailView, setShowDetailView] = useState(false)

  const menteeProps = {
    isMentorSelected,
  }

  return (
    <Flex paddingX="20">
      <Timeline menteeProps={menteeProps} />
      {isMentorSelected ? (
        <Meetings />
      ) : showDetailView ? (
        <DetailView setShowDetailView={setShowDetailView} />
      ) : (
        <Recommendation setShowDetailView={setShowDetailView} />
      )}
    </Flex>
  )
}

export default MenteeDashboard
