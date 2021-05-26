import { Flex } from '@chakra-ui/layout'
import Timeline from 'app/layouts/dashboard/timeline/timeline'
import Meetings from 'app/layouts/dashboard/timeline/meetings'

import { useSelector } from 'react-redux'
import { selectCode } from 'redux/db/selectors'

const MenteeDashboard = () => {
  const userCode = useSelector(selectCode('USER'))
  const trainingStatus = useSelector(selectCode(userCode, 'PRI_TRAINING_STATUS'))?.valueString

  return (
    <Flex paddingX="10">
      <Timeline trainingStatus={trainingStatus} />
      <Meetings />
    </Flex>
  )
}

export default MenteeDashboard
