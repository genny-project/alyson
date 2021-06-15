import { map } from 'ramda'
import { Text, HStack, VStack, useColorModeValue } from '@chakra-ui/react'
import Attribute from 'app/BE/attribute'
const DetailCards = ({ detailsection, currentMentor, miniCard }) => {
  const { header, attributes } = detailsection
  const cardsbg = useColorModeValue('#ffffff', 'gray.600')
  return (
    <VStack
      boxShadow="base"
      rounded="md"
      p="5"
      w={miniCard ? '50%' : '90%'}
      alignItems="flex-start"
      bg={cardsbg}
      minH={miniCard ? '17rem' : 'inherit'}
      mb={5}
    >
      <Text textStyle="head.2" mb={5}>
        {header}
      </Text>
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
