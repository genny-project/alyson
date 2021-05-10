import { Input, Text as ChakraText } from '@chakra-ui/react'
import debounce from 'lodash.debounce'

import { useMobileValue } from 'utils/hooks'

export const Write = ({ questionCode, data, onSendAnswer }) => {
  const debouncedSendAnswer = debounce(onSendAnswer, 500)

  return (
    <Input
      test-id={questionCode}
      onChange={e => debouncedSendAnswer(e.target.value)}
      defaultValue={data?.value}
      w={useMobileValue(['100%', '25vw'])}
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
