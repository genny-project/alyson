import { Box, Grid, VStack, useColorModeValue, useTheme } from '@chakra-ui/react'
import DeveloperConsole, { isDev } from 'utils/developer'
import { SIDEBAR_WIDTH, SIDEBAR_WIDTH_SM, lojing } from 'utils/constants'

import Dialog from 'app/layouts/display/dialog'
import DisplayDrawer from 'app/layouts/display/drawer'
import LogrocketIdentifier from 'app/layouts/components/logrocket_identifier'
import PcmField from 'app/PCM/components/pcm-field'
import Toast from 'app/layouts/display/toast'
import { apiConfig } from 'config/get-api-config'
import { equals } from 'ramda'
import { useGetAttributeFromProjectBaseEntity } from 'app/BE/project-be'
import { useIsMobile } from 'utils/hooks'

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

  const clientId = apiConfig?.clientId

  // THEME COLORS
  //need to fix this, we cannot get colours this way
  const lightColor = equals(clientId)(lojing) ? theme.colors.background['light'] : 'product.gray50'
  const darkColor =
    useGetAttributeFromProjectBaseEntity('PRI_COLOR_BACKGROUND_ON')?.valueString ||
    theme.colors.background['dark']
  const color = useColorModeValue(darkColor, lightColor)

  const appBg = equals(clientId)(lojing) ? theme.colors.background['light'] : 'product.gray50'

  const isMobile = useIsMobile()

  return (
    <Grid
      h={'100vh'}
      templateAreas={`"header header"
    "nav main"`}
      gridTemplateColumns={isMobile ? `${SIDEBAR_WIDTH_SM} 1fr` : `${SIDEBAR_WIDTH} 1fr`}
      gridTemplateRows={'auto 1fr'}
      fontFamily={'product.bodyFont'}
    >
      {/* HEADER WRAPPER */}
      <header
        style={{
          gridArea: 'header',
          color,
          width: '100vw',
          backgroundColor: appBg,
          boxShadow: '0px 4px 32px -16px rgba(0, 0, 0, 0.25)',
          position: 'relative',
          zIndex: theme.zIndices.docked,
        }}
      >
        {/* Header PCM*/}
        <PcmField code={PRI_LOC1} mappedPcm={mappedPcm} properties={{ bg: appBg, color: color }} />
      </header>

      {/* SIDEBAR WRAPPER */}
      <VStack
        area={'nav'}
        w={isMobile ? SIDEBAR_WIDTH_SM : SIDEBAR_WIDTH}
        bg="product.primary"
        h="calc(100vh - 72px)"
        paddingInline={4}
        paddingTop={14}
        overflow="auto"
      >
        {/* Sidebar Pcm */}
        <PcmField code={PRI_LOC2} mappedPcm={mappedPcm} properties={{ color: appBg }} />
      </VStack>

      <Box
        backgroundColor={lightColor}
        id="main-display"
        pb={1}
        h="calc(100vh - 72px)"
        overflow="auto"
        area={'main'}
      >
        <Box
          paddingTop="2.25rem"
          paddingInline={equals(clientId)(lojing) ? 'clamp(1.25rem, 5vw, 7.5rem)' : ''}
        >
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
