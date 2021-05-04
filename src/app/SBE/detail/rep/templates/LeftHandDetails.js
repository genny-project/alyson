import { HStack, Text, VStack } from '@chakra-ui/react'
import { faEnvelopeOpenText, faUser } from '@fortawesome/free-solid-svg-icons'
import { FontAwesomeIcon } from '@fortawesome/react-fontawesome'

import Attribute from 'app/BE/attribute'
import DetailSection from 'app/layouts/components/detail_section'

const LeftHandDetails = ({ beCode, contactDetails }) => {
  return (
    <VStack align="start" w="50%">
      <HStack spacing="10" align="start" mb="1rem">
        <FontAwesomeIcon icon={faUser} />
        <DetailSection
          config={{ textStyle: 'body.2' }}
          noTitle={false}
          code={beCode}
          details={contactDetails}
          hideLabel
        />
      </HStack>
      <HStack spacing="10" align="start" mb="1rem">
        <FontAwesomeIcon icon={faEnvelopeOpenText} />
        <VStack align="start">
          <Text fontWeight="semibold">{`About Myself`}</Text>
          <Attribute code={beCode} attribute={'PRI_BIO'} />
          <HStack>
            <Text w="8rem" fontWeight="semibold">
              {`Department`}
            </Text>
            <Attribute code={beCode} attribute={'PRI_DEPARTMENT'} />
          </HStack>
        </VStack>
      </HStack>
    </VStack>
  )
}

export default LeftHandDetails
