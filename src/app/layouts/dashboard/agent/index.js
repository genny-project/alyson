import { useSelector } from 'react-redux'
import { selectDashboard } from 'redux/app/selectors'
import DisplaySbe from 'app/SBE'
import { Center, HStack, Stack } from '@chakra-ui/react'

import Recommendations from '../intern/recommendations'

const Agent = ({ userCode }) => {
  const dashboardSbes = useSelector(selectDashboard) || []

  return (
    <Center>
      <Stack direction="column">
        <HStack spacing={4}>
          {dashboardSbes.map(sbeCode => (
            <DisplaySbe key={sbeCode} sbeCode={sbeCode} />
          ))}
        </HStack>

        <Recommendations />
      </Stack>
    </Center>
  )
}

export default Agent
