import { Input, Text, useClipboard } from '@chakra-ui/react'
import phoneNumberFormatter from 'utils/formatters/phone-number'
const Read = ({ data }) => {
  const { hasCopied, onCopy } = useClipboard(data.value)

  if (!data?.value) return null

  return (
    <Text _hover={{ textColor: 'whiteAlpha.500' }} onClick={onCopy}>
      {phoneNumberFormatter(data.value)}
    </Text>
  )
}

const Write = ({ data, onSendAnswer }) => (
  <Input defaultValue={data?.value} onBlur={e => onSendAnswer(e.target.value)} />
)

const Phone = {
  Write,
  Read,
}

export default Phone
