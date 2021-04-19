import { useSelector } from 'react-redux'
import { selectDashboard, selectDashboardCounts } from 'redux/app/selectors'
import DisplaySbe from 'app/SBE'
import { Center, HStack, Stack, Spacer } from '@chakra-ui/react'

const Dashboard = () => {
  const dashboardSbes = useSelector(selectDashboard)
  const dashboardCounts = useSelector(selectDashboardCounts)

  if (!dashboardSbes) return <div />
  return (
    <Center m="4">
      <Stack direction="column" spacing="10" h="84vh">
        <HStack spacing={4}>
          {dashboardCounts &&
            dashboardCounts.map(sbeCode => <DisplaySbe key={sbeCode} sbeCode={sbeCode} />)}
        </HStack>
        {dashboardSbes.map(sbeCode => (
          <DisplaySbe key={sbeCode} sbeCode={sbeCode} />
        ))}
        <Spacer />
      </Stack>
    </Center>
  )
}

export default Dashboard
