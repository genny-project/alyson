import { Input, Text, useClipboard, useToast } from '@chakra-ui/react'
import phoneNumberFormatter from 'utils/formatters/phone-number'
const Read = ({ data }) => {
  const { onCopy } = useClipboard(data.value)
  const toast = useToast()

  if (!data?.value) return null

  const onClick = () => {
    onCopy()
    toast({
      title: `${data?.value} copied!`,
      status: 'success',
    })
  }
  return (
    <Text cursor="pointer" onClick={onClick}>
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
