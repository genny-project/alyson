import { VStack, Text } from '@chakra-ui/react'

const Sandbox = () => {
  return (
    <VStack p={10} spacing={5} align="stretch">
      <Text textStyle="head1">Head One</Text>
      <Text textStyle="head2">Head Two</Text>
      <Text textStyle="body1">Body One</Text>
      <Text textStyle="body2">Body Two</Text>
      <Text textStyle="tail1">Tail One</Text>
      <Text textStyle="tail2">Tail Two</Text>
    </VStack>
  )
}

export default Sandbox
