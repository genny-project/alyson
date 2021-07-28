import { VStack } from '@chakra-ui/react'

import {
  internshipDetails,
  companyDetails,
} from 'app/SBE/detail-profile/detail-layout/application/templates/AttributesList.js'
import DetailCard from 'app/SBE/detail-profile/detail-layout/template/layouts/DetailCard.js'

const DetailSection = ({ beCode }) => {
  return (
    <VStack spacing={6} mt={6}>
      <DetailCard beCode={beCode} detailSectionType={internshipDetails} />
      <DetailCard beCode={beCode} detailSectionType={companyDetails} />
    </VStack>
  )
}

export default DetailSection
