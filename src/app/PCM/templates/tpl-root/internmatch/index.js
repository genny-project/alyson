import {
  Box,
  Drawer,
  DrawerBody,
  DrawerCloseButton,
  DrawerContent,
  DrawerOverlay,
  Grid,
  IconButton,
} from '@chakra-ui/react'
import DeveloperConsole, { isDev } from 'utils/developer'

import { faBars } from '@fortawesome/free-solid-svg-icons'
import { FontAwesomeIcon } from '@fortawesome/react-fontawesome'
import LogrocketIdentifier from 'app/layouts/components/logrocket_identifier'
import Dialog from 'app/layouts/display/dialog'
import DisplayDrawer from 'app/layouts/display/drawer'
import Toast from 'app/layouts/display/toast'
import PcmField from 'app/PCM/components/pcm-field'
import { SIDEBAR_WIDTH } from 'utils/constants'

const InternmatchRoot = ({
  isMobile,
  color,
  lightColor,
  theme,
  btnRef,
  PRI_LOC1,
  mappedPcm,
  depth,
  onOpen,
  isOpen,
  onClose,
  PRI_LOC2,
  showTemplateNames,
  PRI_LOC3,
  appWrapperInlinePadding,
}) => {
  return (
    <Grid
      h={'100vh'}
      templateAreas={`"nav header"
    "nav main"`}
      gridTemplateColumns={isMobile ? '1fr' : `${SIDEBAR_WIDTH} 1fr`}
      gridTemplateRows={'1fr'}
      fontFamily={'product.bodyFont'}
    >
      {/* HEADER WRAPPER */}
      <header
        style={{
          gridArea: isMobile ? 'header/nav' : 'header',
          color,
          backgroundColor: lightColor,
          boxShadow: '0px 4px 32px -16px rgba(0, 0, 0, 0.25)',
          position: 'relative',
        }}
      >
        {/* Header PCM*/}
        <PcmField
          code={PRI_LOC1}
          mappedPcm={mappedPcm}
          depth={depth}
          properties={{ bg: 'lightColor', color: color }}
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
                properties={{ color: lightColor }}
              />
            </DrawerBody>
          </DrawerContent>
        </Drawer>
      ) : (
        <Box id="sideNav" gridArea={'nav'} w={SIDEBAR_WIDTH} bg="sidebar.background">
          {/* Sidebar Pcm */}
          <PcmField
            code={PRI_LOC2}
            mappedPcm={mappedPcm}
            depth={depth}
            properties={{ color: lightColor }}
          />
        </Box>
      )}

      {/* MAIN CONTENT WRAPPER */}
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
    </Grid>
  )
}

export default InternmatchRoot
