import { Center, HStack, Stack } from '@chakra-ui/react'
import { selectDashboard, selectDashboardCounts } from 'redux/app/selectors'

import Agent from './agent'
import AgentDashboard from './mentor_agent'
import DisplaySbe from 'app/SBE'
import EduProRep from './edu_pro_rep'
import HostCompanyRep from './hcr'
import Intern from './intern'
import MenteeDashboard from './mentee'
import MentorDashboard from './mentor'
import Process from '../process'
import Progress from './intern/progress'
import Recommendations from './intern/recommendations'
import getUserType from 'utils/helpers/get-user-type'
import { selectCode } from 'redux/db/selectors'
import { useGetRealm } from 'utils/hooks'
import { useSelector } from 'react-redux'

const Dashboard = () => {
  const dashboardSbes = useSelector(selectDashboard)
  const dashboardCounts = useSelector(selectDashboardCounts)
  const userCode = useSelector(selectCode('USER'))
  const userType = getUserType(useSelector(selectCode(userCode)))
  const realm = useGetRealm()

  if (!dashboardSbes) return <div />

  if (userType === 'HOST_CPY_REP') return <HostCompanyRep userCode={userCode} />
  if (userType === 'INTERN') return <Intern userCode={userCode} />
  if (userType === 'AGENT' || userType === 'ADMIN') {
    if (realm === 'mentormatch') {
      return <AgentDashboard userCode={userCode} />
    }
    return <Agent userCode={userCode} />
  }
  if (userType === 'EDU_PRO_REP') return <EduProRep userCode={userCode} />
  if (userType === 'MENTOR') return <MentorDashboard />
  if (userType === 'MENTEE') return <MenteeDashboard />

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
