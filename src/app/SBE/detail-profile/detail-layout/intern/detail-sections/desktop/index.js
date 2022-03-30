import { Box } from '@chakra-ui/layout'
import { find, includes, reduce } from 'ramda'

import 'app/layouts/components/css/hide-scroll.css'
import LeftDetailSection from 'app/SBE/detail-profile/detail-layout/intern/detail-sections/desktop/LeftDetailSection.js'
import RightDetailSection from 'app/SBE/detail-profile/detail-layout/intern/detail-sections/desktop/RightDetailSection.js'
import { selectCode } from 'redux/db/selectors'
import { useSelector } from 'react-redux'

const DesktopView = ({ beCode, sbeCode, onScroll, onWheel }) => {
  const allPcmCode = useSelector(selectCode(`PCMINFORMATION`)) || []
  const internDetailViewPcmCode = find(includes('_INTERN_PROFILE_DETAIL_VIEW'))(allPcmCode)
  const internDetailViewPcm = useSelector(selectCode(internDetailViewPcmCode, 'allAttributes'))

  const mappedPcm = reduce((acc, { attributeCode, valueString }) => {
    acc = { ...acc, [attributeCode]: valueString }
    return acc
  }, {})(internDetailViewPcm || [])

  if (internDetailViewPcm) {
    return (
      <Box className="nobar" overflowY="scroll" onScroll={onScroll} onWheel={onWheel}>
        <Box w="100%" alignItems="start" display="flex">
          <LeftDetailSection beCode={beCode} sbeCode={sbeCode} pcm={true} mappedPcm={mappedPcm} />
          <RightDetailSection beCode={beCode} pcm={true} mappedPcm={mappedPcm} />
        </Box>
      </Box>
    )
  }

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
