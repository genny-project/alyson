import { Flex } from '@chakra-ui/layout'
import Timeline from 'app/layouts/dashboard/timeline/timeline'
import Meetings from 'app/layouts/dashboard/timeline/meetings'

import useGetMenteeInformation from 'app/layouts/dashboard/timeline/helpers/get-mentee-information'

const MenteeDashboard = () => {
  const { trainingStatus } = useGetMenteeInformation()

  const menteeProps = {
    trainingStatus,
  }

  return (
    <Flex paddingX="10">
      <Timeline menteeProps={menteeProps} />
      <Meetings />
    </Flex>
  )
}

export default MenteeDashboard
