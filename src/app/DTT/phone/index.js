import { Input, Text, useClipboard, useToast, HStack } from '@chakra-ui/react'
import phoneNumberFormatter from 'utils/formatters/phone-number'
import { faPhoneAlt } from '@fortawesome/free-solid-svg-icons'
import { FontAwesomeIcon } from '@fortawesome/react-fontawesome'

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
    <HStack spacing="1em">
      <FontAwesomeIcon size="sm" icon={faPhoneAlt} cursor="pointer" onClick={onClick} />
      <Text w="10rem" fontSize={size}>
        {phoneNumberFormatter(data.value)}
      </Text>
    </HStack>
  )
}

const Write = ({ questionCode, data, onSendAnswer }) => (
  <Input
    test-id={questionCode}
    defaultValue={data?.value}
    onBlur={e => onSendAnswer(e.target.value)}
  />
)

const Phone = {
  Write,
  Read,
}

export default Phone
