import { Box, Grid, VStack, useColorModeValue, useTheme } from '@chakra-ui/react'
import DeveloperConsole, { isDev } from 'utils/developer'

import Dialog from 'app/layouts/display/dialog'
import DisplayDrawer from 'app/layouts/display/drawer'
import LogrocketIdentifier from 'app/layouts/components/logrocket_identifier'
import PcmField from 'app/PCM/components/pcm-field'
import { SIDEBAR_WIDTH } from 'utils/constants'
import Toast from 'app/layouts/display/toast'
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
  const bg =
    useGetAttributeFromProjectBaseEntity('PRI_COLOR_PRIMARY_ON')?.valueString ||
    theme.colors.primary[900]

  const primaryColour = useGetAttributeFromProjectBaseEntity('PRI_COLOR_PRIMARY')?.valueString // || '#224371'

  return (
    <Grid
      h={'100vh'}
      templateAreas={`"header header"
    "nav main"`}
      gridTemplateColumns={`${SIDEBAR_WIDTH} 1fr`}
      gridTemplateRows={'auto 1fr'}
    >
      {/* HEADER WRAPPER */}
      <header
        style={{
          gridArea: 'header',
          color,
          width: '100vw',
          backgroundColor: bg,
          boxShadow: '0px 4px 32px -16px rgba(0, 0, 0, 0.25)',
          position: 'relative',
        }}
      >
        {/* Header PCM*/}
        <PcmField code={PRI_LOC1} mappedPcm={mappedPcm} properties={{ bg: bg, color: color }} />
      </header>

      {/* SIDEBAR WRAPPER */}
      <VStack
        area={'nav'}
        w={SIDEBAR_WIDTH}
        bg={primaryColour}
        h="100%"
        paddingInline={4}
        paddingTop={14}
      >
        {/* Sidebar Pcm */}
        <PcmField code={PRI_LOC2} mappedPcm={mappedPcm} properties={{ color: bg }} />
      </VStack>

      <Box backgroundColor={backgroundColor} id="main-display" pb={1} overflow="auto" area={'main'}>
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
    </Grid>
  )
}

export default TemplateRoot
