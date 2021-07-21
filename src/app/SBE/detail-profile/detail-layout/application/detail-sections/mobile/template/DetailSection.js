import { VStack } from '@chakra-ui/react'

import {
  prefs,
  internshipDetails,
  recentEmployment,
} from 'app/SBE/detail-profile/detail-layout/intern/templates/AttributesList.js'
import DetailCard from 'app/SBE/detail-profile/detail-layout/template/layouts/DetailCard.js'

const DetailSection = ({ beCode }) => {
  return (
    <VStack spacing={6} mt={6}>
      <DetailCard beCode={beCode} detailSectionType={prefs} />
      <DetailCard beCode={beCode} detailSectionType={internshipDetails} />
      <DetailCard beCode={beCode} detailSectionType={recentEmployment} />
    </VStack>
  )
}

export default DetailSection
