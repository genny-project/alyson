import { useSelector } from 'react-redux'
import { selectDashboard, selectDashboardCounts } from 'redux/app/selectors'
import DisplaySbe from 'app/SBE'
import { Flex, HStack, Stack } from '@chakra-ui/react'
import Process from '../process'
import { selectCode } from 'redux/db/selectors'
import getUserType from 'utils/helpers/get-user-type'
import MenteeDashboard from './mentee'
import AgentDashboard from './agent'
import Timeline from './timeline/timeline'
import Meetings from './timeline/meetings'

const Dashboard = () => {
  const dashboardSbes = useSelector(selectDashboard)
  const dashboardCounts = useSelector(selectDashboardCounts)
  const userCode = useSelector(selectCode('USER'))
  const userType = getUserType(useSelector(selectCode(userCode)))

  // if (userType === 'MENTEE') return <MenteeDashboard />
  if (userType === 'AGENT' || userType === 'ADMIN') return <AgentDashboard />

  // if (!dashboardSbes) return <div />

  return (
    <Flex paddingX="10">
      <Timeline />
      <Meetings />
    </Flex>
  )
}

export default Dashboard
