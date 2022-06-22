import { Box, useColorModeValue, Center, useTheme } from '@chakra-ui/react'
import DeveloperConsole, { isDev } from 'utils/developer'
import Dialog from 'app/layouts/display/dialog'
import DisplayDrawer from 'app/layouts/display/drawer'
import LogrocketIdentifier from 'app/layouts/components/logrocket_identifier'
import { SIDEBAR_WIDTH } from 'utils/constants'
import Toast from 'app/layouts/display/toast'
import PcmField from 'app/PCM/components/pcm-field'
import { useGetAttributeFromProjectBaseEntity } from 'app/BE/project-be'

/**
 * The root template for an application. Contains a sidebar, header and a body content.
 *
 * Template Code: `TPL_ROOT`
 *
 *
 * LOCS:
 *
 * `PRI_LOC1` -> The Header <br/>
 *
 * `PRI_LOC2` -> The Sidebar <br/>
 *
 * `PRI_LOC3` -> The Main content being displayed
 */
const TemplateRoot = ({ mappedPcm }) => {
  const theme = useTheme()
  const { PRI_LOC1, PRI_LOC2, PRI_LOC3 } = mappedPcm
  const backgroundColor = useColorModeValue('gray.50', '')
  const color = useColorModeValue(theme.colors.text.light, theme.colors.text.dark)

  const bg = useColorModeValue('#F6F6F6', theme.colors.primary[900])

  const primaryColour = useGetAttributeFromProjectBaseEntity('PRI_COLOR_PRIMARY')?.valueString // || '#224371'

  return (
    <Box position={'relative'} h={'100%'}>
      <Center
        w={SIDEBAR_WIDTH}
        bg={primaryColour}
        h="100vh"
        paddingInline={'3'}
        paddingTop={'2.25rem'}
      >
        {/* Sidebar */}
        <PcmField code={PRI_LOC2} mappedPcm={mappedPcm} />
      </Center>
      <Box
        backgroundColor={backgroundColor}
        id="main-display"
        position="fixed"
        left={SIDEBAR_WIDTH}
        top="74px"
        width={`calc(100% - ${SIDEBAR_WIDTH})`}
        h={'calc(100vh - 74px)'}
        pb={1}
        overflow="scroll"
      >
        {/* Header */}
        <PcmField code={PRI_LOC1} mappedPcm={mappedPcm} properties={{ bg: bg, color: color }} />
        <Box paddingTop="2.25rem">
          {/* Main Page Content */}
          <PcmField code={PRI_LOC3} mappedPcm={mappedPcm} />
          <DisplayDrawer />
          <Dialog />
          <Toast />
        </Box>
        {isDev ? <DeveloperConsole /> : null}
        <LogrocketIdentifier />
      </Box>
    </Box>
  )
}

export default TemplateRoot
