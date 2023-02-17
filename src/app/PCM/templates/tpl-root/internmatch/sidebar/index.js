import { useState } from 'react'
import {
  Box,
  Drawer,
  DrawerBody,
  DrawerCloseButton,
  DrawerContent,
  DrawerOverlay,
} from '@chakra-ui/react'

import PcmField from 'app/PCM/components/pcm-field'
import { SIDEBAR_WIDTH, SIDEBAR_WIDTH_SM } from 'utils/constants'

const Sidebar = ({ isMobile, isOpen, onClose, theme, PRI_LOC2, mappedPcm, depth, lightColor }) => {
  const [collapseSidebar, setCollapseSidebar] = useState(false)

  const derivedState = { collapseSidebar, setCollapseSidebar }

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
      w={collapseSidebar ? SIDEBAR_WIDTH_SM : SIDEBAR_WIDTH}
      bg="sidebar.background"
    >
      {/* Sidebar Pcm */}
      <PcmField
        code={PRI_LOC2}
        mappedPcm={mappedPcm}
        depth={depth}
        properties={{ color: lightColor }}
        derivedState={derivedState}
      />
    </Box>
  )
}

export default Sidebar
