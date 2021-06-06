import { map } from 'ramda'
import { Text, HStack, VStack, Spacer, useColorModeValue } from '@chakra-ui/react'

import Attribute from 'app/BE/attribute'

const DetailCards = ({ detailsection, currentMentor }) => {
  const { header, attributes } = detailsection
  const cardsbg = useColorModeValue('#ffffff', 'gray.600')
  return (
    <VStack boxShadow="base" rounded="md" p="5" w="80%" alignItems="flex-start" bg={cardsbg}>
      <Text textStyle="head.2">{header}</Text>
      <Spacer />
      {map(({ attr, label }) => (
        <HStack>
          <Text>{label}</Text>
          <Attribute config={{ textStyle: 'body.3' }} code={currentMentor} attribute={attr} />
        </HStack>
      ))(attributes)}
    </VStack>
  )
}

export default DetailCards
