import { HStack, VStack } from '@chakra-ui/react'
import { FontAwesomeIcon } from '@fortawesome/react-fontawesome'
import { faUser } from '@fortawesome/free-solid-svg-icons'

import DetailSection from 'app/layouts/components/detail_section'

const LeftHandDetails = ({ beCode, contactdetails, horizontalLayoutDetails, status }) => {
  return (
    <HStack spacing="10" align="start">
      <FontAwesomeIcon icon={faUser} />
      <VStack align="start">
        <DetailSection
          config={{ textStyle: 'body.2' }}
          noTitle={false}
          code={beCode}
          details={contactdetails}
          status={status}
          hideLabel
        />
        <DetailSection
          config={{ textStyle: 'body.2' }}
          noTitle
          code={beCode}
          details={horizontalLayoutDetails}
          hideLabel
          horizontalLayout
        />
      </VStack>
    </HStack>
  )
}

export default LeftHandDetails
