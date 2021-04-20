import { HStack, VStack } from '@chakra-ui/react'
import { faEnvelopeOpenText, faUser } from '@fortawesome/free-solid-svg-icons'
import { FontAwesomeIcon } from '@fortawesome/react-fontawesome'

import DetailSection from 'app/layouts/components/detail_section'

const LeftHandDetails = ({
  beCode,
  contactDetails,
  horizontalLayoutDetails,
  internshipDetails,
}) => {
  return (
    <VStack align="start" w="40%">
      <HStack spacing="10" align="start" mb="1rem">
        <FontAwesomeIcon icon={faUser} />
        <VStack align="start">
          <DetailSection
            config={{ textStyle: 'body2' }}
            noTitle={false}
            code={beCode}
            details={contactDetails}
            hideLabel
          />
          <DetailSection
            config={{ textStyle: 'body2' }}
            noTitle
            code={beCode}
            details={horizontalLayoutDetails}
            hideLabel
            horizontalLayout
          />
        </VStack>
      </HStack>
      <HStack spacing="10" align="start" mb="1rem">
        <FontAwesomeIcon icon={faEnvelopeOpenText} />
        <DetailSection
          config={{ textStyle: 'body2' }}
          noTitle={false}
          code={beCode}
          details={internshipDetails}
          hideLabel
          horizontalLayout
        />
      </HStack>
    </VStack>
  )
}

export default LeftHandDetails
