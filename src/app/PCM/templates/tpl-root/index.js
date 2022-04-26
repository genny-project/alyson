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
import getPcmField from '../../helpers/get-pcm-field'

const TemplateRoot = ({ mappedPcm }) => {
  // HEADER, SIDEBAR

  const theme = useTheme()
  const { PRI_LOC1, PRI_LOC2, PRI_LOC3 } = mappedPcm
  const backgroundColor = useColorModeValue('gray.50', '')
  const color = useColorModeValue(theme.colors.text.light, theme.colors.text.dark)

  const bg = useColorModeValue('#F6F6F6', theme.colors.primary[900])

  const { realm } = apiConfig
  const appName = convertToUppercase(realm)

  var primaryColour = useSelector(selectCode('PRJ_' + appName, 'PRI_COLOR_SURFACE'))?.valueString
  if (primaryColour === undefined) {
    primaryColour = '#224371'
  }

  return (
    <Box position={'relative'} h={'100%'}>
      <Center w={SIDEBAR_WIDTH} bg={primaryColour} h="100vh" paddingInline={'3'}>
        {getPcmField(PRI_LOC2, mappedPcm)()}
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
        {getPcmField(PRI_LOC1, mappedPcm, {}, { bg: bg, color: color })()}
        <Box paddingTop="2.25rem">
          {getPcmField(PRI_LOC3, mappedPcm)()}
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
