import { Input, Text as ChakraText } from '@chakra-ui/react'

export const Write = ({ data, onSendAnswer }) => (
  <Input defaultValue={data?.value} onBlur={e => onSendAnswer(e.target.value)} />
)
export const Read = ({ data, size }) => <ChakraText fontSize={size}>{data?.value}</ChakraText>

const Text = {
  Write,
  Read,
}

export default Text
