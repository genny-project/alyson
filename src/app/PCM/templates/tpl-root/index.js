import {
  Box,
  Drawer,
  DrawerBody,
  DrawerCloseButton,
  DrawerContent,
  DrawerOverlay,
  Grid,
  IconButton,
  useColorModeValue,
  useDisclosure,
  useTheme,
} from '@chakra-ui/react'
import DeveloperConsole, { isDev } from 'utils/developer'
import { SIDEBAR_WIDTH, lojing } from 'utils/constants'

import Dialog from 'app/layouts/display/dialog'
import DisplayDrawer from 'app/layouts/display/drawer'
import { FontAwesomeIcon } from '@fortawesome/react-fontawesome'
import LogrocketIdentifier from 'app/layouts/components/logrocket_identifier'
import PcmField from 'app/PCM/components/pcm-field'
import Toast from 'app/layouts/display/toast'
import { apiConfig } from 'config/get-api-config'
import { equals } from 'ramda'
import { faBars } from '@fortawesome/free-solid-svg-icons'
import { useGetAttributeFromProjectBaseEntity } from 'app/BE/project-be'
import { useIsMobile } from 'utils/hooks'
import { useRef } from 'react'

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
const TemplateRoot = ({ mappedPcm, depth }) => {
  const theme = useTheme()
  const btnRef = useRef()
  const { isOpen, onOpen, onClose } = useDisclosure()
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
      gridTemplateColumns={isMobile ? '1fr' : `${SIDEBAR_WIDTH} 1fr`}
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
          zIndex: theme.zIndices.sticky,
        }}
      >
        {/* Header PCM*/}
        <PcmField
          code={PRI_LOC1}
          mappedPcm={mappedPcm}
          depth={depth}
          properties={{ bg: appBg, color: color }}
        />

        {isMobile && (
          <IconButton
            ref={btnRef}
            aria-label="Toggle Side Navigation Bar"
            aria-controls="sideNav"
            icon={<FontAwesomeIcon icon={faBars} />}
            position="absolute"
            top="1.25rem"
            left="0.75rem"
            color="product.secondary"
            bg="transparent"
            onClick={onOpen}
          />
        )}
      </header>

      {/* SIDEBAR WRAPPER */}

      {isMobile ? (
        <Drawer placement="left" isOpen={isOpen} onClose={onClose}>
          <DrawerOverlay />
          <DrawerContent width={'9rem !important'}>
            <DrawerCloseButton color={theme.colors.text.dark} />
            <DrawerBody paddingTop={14} paddingInline={0} bg="product.primary">
              <PcmField
                code={PRI_LOC2}
                mappedPcm={mappedPcm}
                depth={depth}
                properties={{ color: appBg }}
              />
            </DrawerBody>
          </DrawerContent>
        </Drawer>
      ) : (
        <Box
          id="sideNav"
          area={'nav'}
          w={SIDEBAR_WIDTH}
          bg="product.primary"
          h={isMobile ? 'calc(100vh - 80px)' : 'calc(100vh - 86px)'}
          paddingTop={14}
        >
          {/* Sidebar Pcm */}
          <PcmField
            code={PRI_LOC2}
            mappedPcm={mappedPcm}
            depth={depth}
            properties={{ color: appBg }}
          />
        </Box>
      )}

      {/* MAIN CONTENT WRAPPER */}
      <Box
        backgroundColor={lightColor}
        id="main-display"
        pb={1}
        h={isMobile ? 'calc(100vh - 80px)' : 'calc(100vh - 86px)'}
        overflow="auto"
        area={'main'}
      >
        <Box
          paddingTop="2.25rem"
          paddingInline={equals(clientId)(lojing) ? 'clamp(1.25rem, 5vw, 7.5rem)' : ''}
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
    </Grid>
  )
}

export default TemplateRoot
