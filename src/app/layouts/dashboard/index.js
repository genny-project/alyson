import { useSelector } from 'react-redux'
import { selectDashboard, selectDashboardCounts } from 'redux/app/selectors'
import DisplaySbe from 'app/SBE'
import { Center, HStack, Stack, Image, useColorModeValue } from '@chakra-ui/react'
import { apiConfig } from 'config/get-api-config'
import { selectCode } from 'redux/db/selectors'
import getUserType from 'utils/helpers/get-user-type'
import Intern from './intern'
import HostCompanyRep from './hcr'
import Recommendations from './intern/recommendations'

const Dashboard = () => {
  const dashboardSbes = useSelector(selectDashboard)
  const dashboardCounts = useSelector(selectDashboardCounts)
  const userCode = useSelector(selectCode('USER'))

  const userType = getUserType(useSelector(selectCode(userCode)))

  const { realm } = apiConfig
  const logoSrc = useColorModeValue(
    'https://internmatch-uploads.s3-ap-southeast-2.amazonaws.com/internmatch_logo_light.png',
    'https://internmatch-uploads.s3-ap-southeast-2.amazonaws.com/internmatch_logo_dark.png',
  )

  if (userType === 'REP') return <HostCompanyRep userCode={userCode} />
  if (userType === 'INTERN') return <Intern userCode={userCode} />
  if (!dashboardSbes) return <div />
  return (
    <Center>
      <Stack direction="column" spacing="10" h="84vh">
        {apiConfig && realm === 'mentormatch' && (
          <Image src={logoSrc} style={{ cursor: 'pointer' }} htmlWidth="250px" />
        )}
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
