import { Text as ChakraText } from '@chakra-ui/react'
import debounce from 'lodash.debounce'

import { useMobileValue } from 'utils/hooks'
import TextInput from './input'

export const Write = ({ questionCode, data, onSendAnswer }) => {
  const debouncedSendAnswer = debounce(onSendAnswer, 1000)

  return (
    <TextInput
      test-id={questionCode}
      onUpdate={debouncedSendAnswer}
      dataValue={data?.value}
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
