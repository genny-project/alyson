import { Box } from '@chakra-ui/layout'

import 'app/layouts/components/css/hide-scroll.css'
import Header from 'app/SBE/detail-profile/detail-layout/intern/detail-sections/mobile/template/Header.js'
import DetailSection from 'app/SBE/detail-profile/detail-layout/intern/detail-sections/mobile/template/DetailSection.js'

const MobileView = ({ beCode, sbeCode, onScroll, onWheel }) => {
  return (
    <Box
      className="nobar"
      overflowY="scroll"
      onScroll={onScroll}
      onWheel={onWheel}
      ml="5"
      mr="5"
      my="8"
    >
      <Header beCode={beCode} sbeCode={sbeCode} />
      <DetailSection beCode={beCode} sbeCode={sbeCode} />
    </Box>
  )
}

export default MobileView
