import { Text, HStack, VStack } from '@chakra-ui/react'
import { map } from 'ramda'
import { FontAwesomeIcon } from '@fortawesome/react-fontawesome'

import Attribute from 'app/BE/attribute'

const DetailSection = ({ beCode, details: { sectionIcon, title, attributes } }) => {
  return (
    <HStack p="4" alignItems="start">
      <Text pr="4" pt="1">
        <FontAwesomeIcon size="lg" icon={sectionIcon} />
      </Text>
      <VStack alignItems="left">
        <Text fontSize="xl">{title}</Text>
        {map(attr => <Attribute code={beCode} attribute={attr} />)(attributes)}
      </VStack>
    </HStack>
  )
}

export default DetailSection
