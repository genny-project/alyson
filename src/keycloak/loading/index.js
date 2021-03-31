import { Box, Flex } from '@chakra-ui/layout'
import { Progress } from '@chakra-ui/progress'
import LoadingText from './loading-text'

const Loading = () => (
  <Flex justifyContent="center">
    <Progress w="full" isIndeterminate />
    <Box position="fixed" top="50%">
      <LoadingText />
    </Box>
  </Flex>
)

export default Loading
