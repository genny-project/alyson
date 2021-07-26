import { VStack } from '@chakra-ui/layout'

import 'app/layouts/components/css/hide-scroll.css'
import Header from 'app/SBE/detail-profile/detail-layout/internship/detail-sections/desktop/template/Header.js'
import {
  InternshipDetailsSection,
  CompanyDetailsSection,
} from 'app/SBE/detail-profile/detail-layout/internship/detail-sections/desktop/template/ProfileSections.js'

const RightDetail = ({ beCode }) => {
  return (
    <VStack flex="1" m={3} mb={8} spacing={6}>
      <Header beCode={beCode} />
      <InternshipDetailsSection beCode={beCode} />
      <CompanyDetailsSection beCode={beCode} />
    </VStack>
  )
}

export default RightDetail
