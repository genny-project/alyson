import { HStack, Text, VStack } from '@chakra-ui/react'
import { FontAwesomeIcon } from '@fortawesome/react-fontawesome'
import { faEnvelopeOpenText } from '@fortawesome/free-solid-svg-icons'

import Attribute from 'app/BE/attribute'

const RightHandDetails = ({ beCode }) => {
  return (
    <HStack spacing="10" align="start">
      <FontAwesomeIcon icon={faEnvelopeOpenText} />
      <VStack align="start">
        <Text fontWeight="semibold">{`Description`}</Text>
        <Attribute
          code={beCode}
          attribute={'PRI_COMPANY_DESCRIPTION'}
          fallback={<Text>{`No company description`}</Text>}
        />
      </VStack>
    </HStack>
  )
}

export default RightHandDetails
