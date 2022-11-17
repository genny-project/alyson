import { Progress, Text, VStack } from '@chakra-ui/react'

import ProgressBar from './Progress_Bar'

const Read = ({ data }) => <ProgressBar value={data?.value} />
const Write = ({ data, placeholderName: label, colorScheme = 'green', size = 'sm' }) => {
  return (
    <VStack alignItems="start">
      <Text color="gray.700" alignSelf="start">
        {label}
      </Text>
      <Progress w="full" colorScheme={colorScheme} size={size} value="20" />
    </VStack>
  )
}

const ProgressComponent = {
  Read,
  Write,
}

export default ProgressComponent
