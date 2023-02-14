import {
  Box,
  Drawer,
  DrawerBody,
  DrawerCloseButton,
  DrawerContent,
  DrawerOverlay,
} from '@chakra-ui/react'

import PcmField from 'app/PCM/components/pcm-field'
import { SIDEBAR_WIDTH } from 'utils/constants'

const Sidebar = ({ isMobile, isOpen, onClose, theme, PRI_LOC2, mappedPcm, depth, lightColor }) => {
  return isMobile ? (
    <Drawer placement="left" isOpen={isOpen} onClose={onClose}>
      <DrawerOverlay />
      <DrawerContent>
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
  )
}

export default Sidebar
