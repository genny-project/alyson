import { useSelector } from 'react-redux'
import { selectDashboard, selectDashboardCounts } from 'redux/app/selectors'
import DisplaySbe from 'app/SBE'
import { Center, HStack, Stack, Text, Spacer, Image, useColorModeValue } from '@chakra-ui/react'
import { apiConfig } from 'config/get-api-config'

const getLogo = (realm, lightMode) =>
  realm === 'internmatch'
    ? lightMode
      ? 'https://internmatch-uploads.s3-ap-southeast-2.amazonaws.com/internmatch_logo_light.png'
      : 'https://internmatch-uploads.s3-ap-southeast-2.amazonaws.com/internmatch_logo_dark.png'
    : 'https://raw.githubusercontent.com/OutcomeLife/prj_mentormatch/7.17.0/docs/mentormatch_logo.png'

const Dashboard = () => {
  const dashboardSbes = useSelector(selectDashboard)
  const dashboardCounts = useSelector(selectDashboardCounts)

  const { realm } = apiConfig
  const logoSrc = useColorModeValue(getLogo(realm, true), getLogo(realm))

  if (!dashboardSbes) return <div />
  return (
    <Center m="4">
      <Stack direction="column" spacing="10" h="84vh">
        {apiConfig && realm === 'mentormatch' && (
          <Image src={logoSrc} style={{ cursor: 'pointer' }} htmlWidth="250px" />
        )}
        <HStack>
          {dashboardCounts &&
            dashboardCounts.map(sbeCode => <DisplaySbe key={sbeCode} sbeCode={sbeCode} />)}
        </HStack>
        {dashboardSbes.map(sbeCode => (
          <DisplaySbe key={sbeCode} sbeCode={sbeCode} />
        ))}
        <Spacer />
        <Text as="samp" fontSize="xs">
          Powered By GADA Technology
        </Text>
      </Stack>
    </Center>
  )
}

export default Dashboard
