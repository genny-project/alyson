import { Flex } from '@chakra-ui/layout'

import Timeline from 'app/layouts/dashboard/timeline'
import useGetMentorTimelineItems from 'app/layouts/dashboard/mentor/helpers/get-timeline-items'

const MentorDashboard = () => {
  const { items } = useGetMentorTimelineItems()

  return (
    <Flex paddingX="10">
      <Timeline items={items} />
    </Flex>
  )
}

export default MentorDashboard
