import { Input, Text as ChakraText } from '@chakra-ui/react'

export const Write = ({ questionCode, data, onSendAnswer }) => (
  <Input
    test-id={questionCode}
    defaultValue={data?.value}
    onBlur={e => onSendAnswer(e.target.value)}
  />
)
export const Read = ({ data, config, size }) => (
  <ChakraText fontSize={size} noOfLines={3} {...config}>
    {data?.value}
  </ChakraText>
)

const Text = {
  Write,
  Read,
}

export default Text
