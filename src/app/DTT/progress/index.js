import ProgressBar from './Progress_Bar'
import { Progress, Text, VStack } from '@chakra-ui/react'

const Read = ({ data }) => <ProgressBar value={data?.value} />
const Write = ({ data, placeholderName: label }) => {
  return (
    <VStack alignItems="start">
      <Text color="gray.700" alignSelf="start">
        {label}
      </Text>
      <Progress w="full" colorScheme="green" size="sm" value="20" />
    </VStack>
  )
}

const ProgressComponent = {
  Read,
  Write,
}

export default ProgressComponent
