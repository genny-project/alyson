import { useSelector } from 'react-redux'
import { selectDashboard, selectDashboardCounts } from 'redux/app/selectors'
import DisplaySbe from 'app/SBE'
import { Center, HStack, Stack } from '@chakra-ui/react'
import { selectCode } from 'redux/db/selectors'
import getUserType from 'utils/helpers/get-user-type'
import Intern from './intern'
import HostCompanyRep from './hcr'
import Recommendations from './intern/recommendations'
import Agent from './agent'

const Dashboard = () => {
  const dashboardSbes = useSelector(selectDashboard)
  const dashboardCounts = useSelector(selectDashboardCounts)
  const userCode = useSelector(selectCode('USER'))

  const userType = getUserType(useSelector(selectCode(userCode)))

  console.log(userType)
  if (userType === 'REP') return <HostCompanyRep userCode={userCode} />
  if (userType === 'INTERN') return <Intern userCode={userCode} />
  if (userType === 'AGENT' || userType === 'ADMIN') return <Agent userCode={userCode} />
  if (!dashboardSbes) return <div />
  return (
    <Center>
      <Stack direction="column" spacing="10" h="84vh">
        <HStack spacing={4}>
          {dashboardCounts &&
            dashboardCounts.map(sbeCode => <DisplaySbe key={sbeCode} sbeCode={sbeCode} />)}
        </HStack>
        {dashboardSbes.map(sbeCode => (
          <DisplaySbe key={sbeCode} sbeCode={sbeCode} />
        ))}
        <Recommendations />
      </Stack>
    </Center>
  )
}

export default Dashboard
