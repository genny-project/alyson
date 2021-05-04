import { HStack, Text, VStack } from '@chakra-ui/react'
import { FontAwesomeIcon } from '@fortawesome/react-fontawesome'
import { faCompactDisc, faObjectGroup, faUserClock } from '@fortawesome/free-solid-svg-icons'

import DetailSection from 'app/layouts/components/detail_section'
import Software from 'app/layouts/components/software'

const RightHandDetails = ({ beCode, software, recentEmployment, careerObj }) => {
  return (
    <VStack align="start" w="50%">
      <HStack spacing="10" align="start" mb="1rem">
        <FontAwesomeIcon icon={faCompactDisc} />
        <VStack align="start">
          <Text fontWeight="semibold">{`Known Software`}</Text>
          <Software value={software?.value} />
        </VStack>
      </HStack>
      <HStack spacing="10" align="start" mb="1rem">
        <FontAwesomeIcon icon={faUserClock} />
        <DetailSection
          config={{ textStyle: 'body2' }}
          noTitle={false}
          code={beCode}
          details={recentEmployment}
          hideLabel
          horizontalLayout
        />
      </HStack>
      <HStack spacing="10" align="start" mb="1rem">
        <FontAwesomeIcon icon={faObjectGroup} />
        <VStack align="start">
          <Text textStyle="body.1">{`Career Objectives`}</Text>
          <Text textStyle="body2" dangerouslySetInnerHTML={{ __html: careerObj?.value }} />
        </VStack>
      </HStack>
    </VStack>
  )
}

export default RightHandDetails
