import { useSelector } from 'react-redux'
import { Center, HStack, Stack } from '@chakra-ui/react'

import { selectDashboard, selectDashboardCounts } from 'redux/app/selectors'
import DisplaySbe from 'app/SBE'
import Process from '../process'
import { selectCode } from 'redux/db/selectors'
import getUserType from 'utils/helpers/get-user-type'
import Intern from './intern'
import HostCompanyRep from './hcr'
import EduProRep from './edu_pro_rep'
import MenteeDashboard from './mentee'
import AgentDashboard from './agent'
import MentorDashboard from './mentor'

const Dashboard = () => {
  const dashboardSbes = useSelector(selectDashboard)
  const dashboardCounts = useSelector(selectDashboardCounts)
  const userCode = useSelector(selectCode('USER'))
  const userType = getUserType(useSelector(selectCode(userCode)))

  if (userType === 'INTERN') return <Intern />
  if (userType === 'EDU_PRO_REP') return <EduProRep />
  if (userType === 'HOST_CPY_REP') return <HostCompanyRep />
  if (userType === 'MENTOR') return <MentorDashboard />
  if (userType === 'MENTEE') return <MenteeDashboard />
  if (userType === 'AGENT' || userType === 'ADMIN') return <AgentDashboard />

  if (!dashboardSbes) return <div />

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
        <Process dashboard />
      </Stack>
    </Center>
  )
}

export default Dashboard
