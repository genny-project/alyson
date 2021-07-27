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
import Process from '../process'
import EduProRep from './edu_pro_rep'
import Progress from './intern/progress'
const Dashboard = () => {
  const dashboardSbes = useSelector(selectDashboard)
  const dashboardCounts = useSelector(selectDashboardCounts)
  const userCode = useSelector(selectCode('USER'))
  const userType = getUserType(useSelector(selectCode(userCode)))

  if (!dashboardSbes) return <div />

  if (userType === 'HOST_CPY_REP') return <HostCompanyRep userCode={userCode} />
  if (userType === 'INTERN') return <Intern userCode={userCode} />
  if (userType === 'AGENT' || userType === 'ADMIN') return <Agent userCode={userCode} />
  if (userType === 'EDU_PRO_REP') return <EduProRep userCode={userCode} />
  return (
    <Center>
      <Stack direction="column" spacing="10" h="84vh">
        <Center>
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

        <Progress />
        <Recommendations />
        <Process dashboard />
      </Stack>
    </Center>
  )
}

export default Dashboard
