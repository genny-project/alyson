import { VStack } from '@chakra-ui/react'
import { useSelector } from 'react-redux'

import {
  internshipDetails,
  companyDetails,
  companyDetailsInternView,
} from 'app/SBE/detail-profile/detail-layout/internship/templates/AttributesList.js'
import DetailCard from 'app/SBE/detail-profile/detail-layout/template/layouts/DetailCard.js'
import getUserType from 'utils/helpers/get-user-type'
import { selectCode } from 'redux/db/selectors'

const DetailSection = ({ beCode }) => {
  const userCode = useSelector(selectCode('USER'))
  const userType = getUserType(useSelector(selectCode(userCode)))
  return (
    <VStack spacing={6} mt={6}>
      <DetailCard beCode={beCode} detailSectionType={internshipDetails} />
      {userType === 'INTERN' ? (
        <DetailCard beCode={beCode} detailSectionType={companyDetailsInternView} />
      ) : (
        <DetailCard beCode={beCode} detailSectionType={companyDetails} />
      )}
    </VStack>
  )
}

export default DetailSection
