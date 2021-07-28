import { Box } from '@chakra-ui/layout'

import 'app/layouts/components/css/hide-scroll.css'
import LeftDetailSection from 'app/SBE/detail-profile/detail-layout/intern/detail-sections/desktop/LeftDetailSection.js'
import RightDetailSection from 'app/SBE/detail-profile/detail-layout/intern/detail-sections/desktop/RightDetailSection.js'

const DesktopView = ({ beCode, sbeCode, onScroll, onWheel }) => {
  return (
    <Box className="nobar" overflowY="scroll" onScroll={onScroll} onWheel={onWheel}>
      <Box w="100%" alignItems="start" display="flex">
        <LeftDetailSection beCode={beCode} sbeCode={sbeCode} />
        <RightDetailSection beCode={beCode} />
      </Box>
    </Box>
  )
}

export default DesktopView
