import {
  Box,
  Drawer,
  DrawerBody,
  DrawerCloseButton,
  DrawerContent,
  DrawerOverlay,
} from '@chakra-ui/react'
import { SIDEBAR_WIDTH, SIDEBAR_WIDTH_SM } from 'utils/constants'

import PcmField from 'app/PCM/components/pcm-field'

const Sidebar = ({
  isMobile,
  isOpen,
  onClose,
  theme,
  PRI_LOC2,
  mappedPcm,
  depth,
  lightColor,
  isSidebarCollapsed,
}) => {
  const sidebarWidth = isSidebarCollapsed ? SIDEBAR_WIDTH_SM : SIDEBAR_WIDTH

  return isMobile ? (
    <Drawer placement="left" isOpen={isOpen} onClose={onClose}>
      <DrawerOverlay />
      <DrawerContent>
        <DrawerCloseButton color={theme.colors.text.dark} />
        <DrawerBody paddingTop={14} paddingInline={0} bg="internmatch.primary">
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
    <Box
      id="sideNav"
      gridArea={'nav'}
      w={sidebarWidth}
      bg="sidebar.background"
      zIndex={theme.zIndices.popover}
      transition={'all 0.25s ease'}
    >
      {/* Sidebar Pcm */}
      <PcmField
        code={PRI_LOC2}
        mappedPcm={mappedPcm}
        depth={depth}
        properties={{ color: lightColor }}
        isSidebarCollapsed={isSidebarCollapsed}
      />
    </Box>
  )
}

export default Sidebar
