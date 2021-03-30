import { Box } from '@chakra-ui/layout'
import { Progress } from '@chakra-ui/progress'
import LoadingText from './loading-text'

const Loading = () => (
  <div>
    <Progress w="full" isIndeterminate />
    <Box position="fixed" top="50%" left="calc(50% - 13rem)">
      <LoadingText />
    </Box>
  </div>
)

export default Loading
