import { VStack, Text } from '@chakra-ui/react'
import { SIDEBAR_WIDTH } from 'utils/constants'

const SideBar = () => {
  return (
    <VStack w={SIDEBAR_WIDTH} bg="blue" h="100vh">
      <Text>{`one`}</Text>
      <Text>{`one`}</Text>
      <Text>{`one`}</Text>
      <Text>{`one`}</Text>
      <Text>{`one`}</Text>
      <Text>{`one`}</Text>
      <Text>{`one`}</Text>
    </VStack>
  )
}

export default SideBar
