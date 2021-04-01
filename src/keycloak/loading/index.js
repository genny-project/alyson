import { Center } from '@chakra-ui/layout'
import { CircularProgress } from '@chakra-ui/progress'

const Loading = () => (
  <Center h="100vh">
    <CircularProgress isIndeterminate trackColor="teal.400" color="blue.500" />
  </Center>
)

export default Loading
