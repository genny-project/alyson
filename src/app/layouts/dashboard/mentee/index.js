import { Flex } from '@chakra-ui/layout'
import Timeline from 'app/layouts/dashboard/timeline/timeline'
import Meetings from 'app/layouts/dashboard/timeline/meetings'
import Recommendation from 'app/layouts/dashboard/timeline/recommendations'

import useGetMenteeInformation from 'app/layouts/dashboard/timeline/helpers/get-mentee-information'

const MenteeDashboard = () => {
  const { isMentorSelected } = useGetMenteeInformation()

  const menteeProps = {
    isMentorSelected,
  }

  return (
    <Flex paddingX="10">
      <Timeline menteeProps={menteeProps} />
      {isMentorSelected ? <Meetings /> : <Recommendation />}
    </Flex>
  )
}

export default MenteeDashboard
