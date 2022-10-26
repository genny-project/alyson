import { Progress, VStack, Text } from '@chakra-ui/react'

const Read = ({ data }) => <Progress colorScheme="green" borderRadius="md" value={data?.value} />

const Write = ({ data, placeholderName: label }) => {
  return (
    <VStack alignItems="start">
      <Text>{label}</Text>
      <Progress w="full" colorScheme="green" borderRadius="md" value={90} />
    </VStack>
  )
}

const ProgressComponent = {
  Write,
  Read,
}

export default ProgressComponent
