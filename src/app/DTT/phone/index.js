import { Input, Text, useClipboard, useToast } from '@chakra-ui/react'
import phoneNumberFormatter from 'utils/formatters/phone-number'
const Read = ({ data, size }) => {
  const { onCopy } = useClipboard(data.value)
  const toast = useToast()

  if (!data?.value) return null

  const onClick = () => {
    onCopy()
    toast({
      title: `${data?.value} copied!`,
      status: 'success',
      duration: 1000,
    })
  }
  return (
    <Text w="10rem" fontSize={size} cursor="pointer" onClick={onClick}>
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
