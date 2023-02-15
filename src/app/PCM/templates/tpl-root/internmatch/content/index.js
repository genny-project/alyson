import { equals } from 'ramda'
import { useSelector } from 'react-redux'
import { Box } from '@chakra-ui/react'
import { Center } from '@chakra-ui/layout'
import { CircularProgress } from '@chakra-ui/progress'

import DeveloperConsole, { isDev } from 'utils/developer'
import LogrocketIdentifier from 'app/layouts/components/logrocket_identifier'
import Dialog from 'app/layouts/display/dialog'
import DisplayDrawer from 'app/layouts/display/drawer'
import Toast from 'app/layouts/display/toast'
import PcmField from 'app/PCM/components/pcm-field'
import { selectWaitingForBackendResponse } from 'redux/app/selectors'

const Content = ({ isMobile, lightColor, PRI_LOC3, mappedPcm, depth }) => {
  const waitingForBackendResponse = useSelector(selectWaitingForBackendResponse)

  return equals(waitingForBackendResponse)('true') ? (
    <Center h="100vh">
      <CircularProgress isIndeterminate trackColor="teal.400" color="blue.500" />
    </Center>
  ) : (
    <Box
      backgroundColor={lightColor}
      id="main-display"
      pb={1}
      overflow="auto"
      gridArea={isMobile ? 'main/nav' : 'main'}
    >
      <Box
        paddingTop="2.25rem"
        paddingInlineStart={'clamp(1rem, 5vw + 1rem, 6.69rem)'}
        paddingInlineEnd={'1rem'}
      >
        {/* Main Page Content */}
        <PcmField code={PRI_LOC3} mappedPcm={mappedPcm} depth={depth} />
        <DisplayDrawer />
        <Dialog />
        <Toast />
      </Box>
      {isDev ? <DeveloperConsole /> : null}
      <LogrocketIdentifier />
    </Box>
  )
}

export default Content
