import { Text } from '@chakra-ui/layout'
import { Progress } from '@chakra-ui/progress'

const Loading = () => (
  <div>
    <Text
      as="samp"
      position="fixed"
      top="50%"
      left="calc(50% - 13rem)"
      fontSize="3xl"
      fontWeight="semibold"
      color="lightgrey"
    >
      Securely logging you in...
    </Text>
    <Progress w="full" isIndeterminate />
  </div>
)

export default Loading
