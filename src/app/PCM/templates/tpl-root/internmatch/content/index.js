import DeveloperConsole, { isDev } from 'utils/developer'

import { Box } from '@chakra-ui/react'
import LogrocketIdentifier from 'app/layouts/components/logrocket_identifier'
import Dialog from 'app/layouts/display/dialog'
import DisplayDrawer from 'app/layouts/display/drawer'
import Toast from 'app/layouts/display/toast'
import PcmField from 'app/PCM/components/pcm-field'

const Content = ({ isMobile, PRI_LOC3, mappedPcm, depth }) => {
  return (
    <Box id="main-display" pb={1} overflow="auto" gridArea={isMobile ? 'main/nav' : 'main'}>
      <Box
        paddingTop="1.63rem"
        paddingInlineStart={'clamp(1rem, 5vw, 6.69rem)'}
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
