import { Center, VStack } from '@chakra-ui/react'

const DetailContainer = props => {
  return (
    <Center w={'50%'} bg="white" rounded="3xl">
      <VStack w={'85%'} paddingBlock={'2rem'} spacing={'1rem'} alignItems={'start'}>
        {props.children}
      </VStack>
    </Center>
  )
}

export default DetailContainer
