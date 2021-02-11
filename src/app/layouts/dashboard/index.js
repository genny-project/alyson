import { useSelector } from 'react-redux'
import { selectDashboard } from 'redux/app/selectors'
import DisplaySbe from 'app/SBE'
import { Center, Stack } from '@chakra-ui/react'

const Dashboard = () => {
  const dashboardSbes = useSelector(selectDashboard)

  if (!dashboardSbes) return <div />
  return (
    <Center m="4">
      <Stack direction="column" spacing="10">
        {dashboardSbes.map(sbeCode => (
          <DisplaySbe sbeCode={sbeCode} />
        ))}
      </Stack>
    </Center>
  )
}

export default Dashboard
