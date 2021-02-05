import { Input, Text as ChakraText } from '@chakra-ui/react'

export const Write = props => <Input onBlur={e => props.onSendAnswer(e.target.value)} />
export const Read = ({ data, textProps }) => <ChakraText {...textProps}>{data?.value}</ChakraText>

const Text = {
  Write,
  Read,
}

export default Text
