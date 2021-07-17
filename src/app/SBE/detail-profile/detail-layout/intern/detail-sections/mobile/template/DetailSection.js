import { Box } from '@chakra-ui/layout'

import {
  prefs,
  internshipDetails,
  recentEmployment,
} from 'app/SBE/detail-profile/detail-layout/template/attributes-list/index.js'
import DetailCard from 'app/SBE/detail-profile/detail-layout/template/layouts/DetailCard.js'

const DetailSection = ({ beCode, sbeCode }) => {
  return (
    <Box mt={4}>
      <DetailCard beCode={beCode} detailSectionType={prefs} />
    </Box>
  )
}

export default DetailSection
