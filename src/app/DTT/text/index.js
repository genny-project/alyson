import { Input, Text as ChakraText } from '@chakra-ui/react'
import debounce from 'lodash.debounce'

export const Write = ({ questionCode, data, onSendAnswer }) => {
  const debouncedSendAnswer = debounce(onSendAnswer, 500)

  return (
    <Input
      test-id={questionCode}
      onChange={e => debouncedSendAnswer(e.target.value)}
      defaultValue={data?.value}
      w="full"
      maxW="25vw"
    />
  )
}
export const Read = ({ data, config }) => (
  <ChakraText noOfLines={3} {...config}>
    {data?.value}
  </ChakraText>
)

const Text = {
  Write,
  Read,
}

export default Text
