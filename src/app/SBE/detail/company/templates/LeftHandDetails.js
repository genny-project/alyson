import { HStack, Text, VStack } from '@chakra-ui/react'
import { FontAwesomeIcon } from '@fortawesome/react-fontawesome'
import { faEnvelopeOpenText, faUser } from '@fortawesome/free-solid-svg-icons'

import DetailSection from 'app/layouts/components/detail_section'
import Attribute from 'app/BE/attribute'

const LeftHandDetails = ({ beCode, contactdetails, status }) => {
  return (
    <VStack align="start" w="50%">
      <HStack spacing="10" align="start">
        <FontAwesomeIcon icon={faUser} />
        <DetailSection
          config={{ textStyle: 'body.2' }}
          noTitle={false}
          code={beCode}
          details={contactdetails}
          status={status}
          hideLabel
        />
      </HStack>
      <HStack spacing="10" align="start">
        <FontAwesomeIcon icon={faEnvelopeOpenText} />
        <VStack align="start">
          <Text fontWeight="semibold">Description</Text>
          <Attribute
            code={beCode}
            attribute={'PRI_COMPANY_DESCRIPTION'}
            fallback={<Text>{`No company description`}</Text>}
          />
        </VStack>
      </HStack>
    </VStack>
  )
}

export default LeftHandDetails
