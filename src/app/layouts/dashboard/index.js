import { useSelector } from 'react-redux'
import { selectDashboard, selectDashboardCounts } from 'redux/app/selectors'
import DisplaySbe from 'app/SBE'
import { Center, HStack, Stack } from '@chakra-ui/react'
import AsksForm from 'app/ASKS/form'

const Dashboard = () => {
  const dashboardSbes = useSelector(selectDashboard)
  const dashboardCounts = useSelector(selectDashboardCounts)

  if (!dashboardSbes) return <div />

  return (
    <Center>
      <Stack direction="column" spacing="10" h="84vh">
        <Center>
          <AsksForm questionCode={'QUE_DEV_PORTAL_ACCESS_GRP'} />
          <HStack spacing={4}>
            {dashboardCounts &&
              dashboardCounts.map(sbeCode => <DisplaySbe key={sbeCode} sbeCode={sbeCode} />)}
          </HStack>
        </Center>
        <Center>
          <HStack spacing={4}>
            {dashboardSbes.map(sbeCode => (
              <DisplaySbe key={sbeCode} sbeCode={sbeCode} />
            ))}
          </HStack>
        </Center>
      </Stack>
    </Center>
  )
}

export default Dashboard
