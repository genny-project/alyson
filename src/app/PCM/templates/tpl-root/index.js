import { Box, useColorModeValue, Center, useTheme } from '@chakra-ui/react'
import DeveloperConsole, { isDev } from 'utils/developer'
import { useSelector } from 'react-redux'
import Dialog from 'app/layouts/display/dialog'
import DisplayDrawer from 'app/layouts/display/drawer'
import LogrocketIdentifier from 'app/layouts/components/logrocket_identifier'
import { SIDEBAR_WIDTH } from 'utils/constants'
import Toast from 'app/layouts/display/toast'
import { selectCode } from 'redux/db/selectors'
import convertToUppercase from 'utils/formatters/uppercase-convert'
import { apiConfig } from 'config/get-api-config'
import PcmField from 'app/PCM/components/pcm-field'
import { find, includes, values } from 'ramda'

const TemplateRoot = ({ mappedPcm }) => {
  const getPcmCode = pcmCode => find(includes(pcmCode))(allPcmValues)

  const { clientId } = apiConfig
  const appName = convertToUppercase(clientId)

  const theme = useTheme()
  const backgroundColor = useColorModeValue('gray.50', '')
  const color = useColorModeValue(theme.colors.text.light, theme.colors.text.dark)
  const bg = useColorModeValue('#F6F6F6', theme.colors.primary[900])
  // Write a function that gets an attribute out of project base entity
  const primaryColour =
    useSelector(selectCode('PRJ_' + appName, 'PRI_COLOR_SURFACE'))?.valueString || '#224371'

  const allPcmValues = values(mappedPcm)
  const sidebarPcmCode = getPcmCode('SIDEBAR')
  const headerPcmCode = getPcmCode('HEADER')
  const displayPcmCode = getPcmCode('DISPLAY')

  return (
    <Box position={'relative'} h={'100%'}>
      <Center w={SIDEBAR_WIDTH} bg={primaryColour} h="100vh" paddingInline={'3'}>
        {/* Sidebar */}
        <PcmField code={sidebarPcmCode} mappedPcm={mappedPcm} />
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
        <PcmField
          code={headerPcmCode}
          mappedPcm={mappedPcm}
          properties={{ bg: bg, color: color }}
        />
        <Box paddingTop="2.25rem">
          {/* Main Page Content */}
          <PcmField code={displayPcmCode} mappedPcm={mappedPcm} />
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
