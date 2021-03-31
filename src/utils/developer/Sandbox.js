import { VStack, Text } from '@chakra-ui/react'

const Sandbox = () => {
  return (
    <VStack p={10} spacing={5} align="stretch">
      <Text textStyle="head1">The quick brown fox jumps over the lazy dog.</Text>
      <Text textStyle="head2">The quick brown fox jumps over the lazy dog.</Text>
      <Text textStyle="head3">The quick brown fox jumps over the lazy dog.</Text>

      <Text textStyle="body1">The quick brown fox jumps over the lazy dog.</Text>
      <Text textStyle="body2">The quick red panda jumps over the lazy yak.</Text>
      <Text textStyle="body3">The quick brown fox jumps over the lazy dog.</Text>

      <Text textStyle="tail1">The quick brown fox jumps over the lazy dog.</Text>
      <Text textStyle="tail2">The quick brown fox jumps over the lazy dog.</Text>
      <Text textStyle="tail3">The quick brown fox jumps over the lazy dog.</Text>
    </VStack>
  )
}

export default Sandbox
