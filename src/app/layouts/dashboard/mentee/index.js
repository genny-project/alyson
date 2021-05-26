import { Flex } from '@chakra-ui/layout'
import Timeline from 'app/layouts/dashboard/timeline/timeline'
import Meetings from 'app/layouts/dashboard/timeline/meetings'

const MenteeDashboard = () => {
  return (
    <Flex paddingX="10">
      <Timeline />
      <Meetings />
    </Flex>
  )
}

export default MenteeDashboard
