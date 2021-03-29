import { Text } from '@chakra-ui/layout'
import { Progress } from '@chakra-ui/progress'

const Loading = () => (
  <div>
    <Text position="fixed" top="50%" left="calc(50% - 13rem)" textStyle="body1" color="lightgrey">
      Securely logging you in...
    </Text>
    <Progress w="full" isIndeterminate />
  </div>
)

export default Loading
