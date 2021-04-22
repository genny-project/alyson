import { Input, Text as ChakraText } from '@chakra-ui/react'
import debounce from 'lodash.debounce'
export const Write = ({ questionCode, data, onSendAnswer }) => {
  const debouncedSendAnswer = debounce(onSendAnswer, 500)

  return (
    <Input
      test-id={questionCode}
      defaultValue={data?.value}
      onChange={e => debouncedSendAnswer(e.target.value)}
      spellCheck={true}
      lang="en"
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
