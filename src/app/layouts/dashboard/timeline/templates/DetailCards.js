import { Text, HStack, VStack, Spacer } from '@chakra-ui/react'
import { map } from 'ramda'
import Attribute from 'app/BE/attribute'

const DetailCards = ({ detailsection, currentMentor }) => {
  const { header, attributes } = detailsection
  return (
    <VStack boxShadow="base" rounded="md" p="5" w="80%" alignItems="flex-start" bg="gray.50">
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
