import { Box } from '@chakra-ui/react'

import DeveloperConsole, { isDev } from 'utils/developer'
import LogrocketIdentifier from 'app/layouts/components/logrocket_identifier'
import Dialog from 'app/layouts/display/dialog'
import DisplayDrawer from 'app/layouts/display/drawer'
import Toast from 'app/layouts/display/toast'
import PcmField from 'app/PCM/components/pcm-field'

const Content = ({
  isMobile,
  lightColor,
  showTemplateNames,
  appWrapperInlinePadding,
  PRI_LOC3,
  mappedPcm,
  depth,
}) => {
  return (
    <Box
      backgroundColor={lightColor}
      id="main-display"
      pb={1}
      h={
        showTemplateNames
          ? 'calc(100vh - 170px)'
          : isMobile
          ? 'calc(100vh - 80px)'
          : 'calc(100vh - 86px)'
      }
      overflow="auto"
      gridArea={isMobile ? 'main/nav' : 'main'}
    >
      <Box paddingTop="2.25rem" paddingInline={appWrapperInlinePadding}>
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
