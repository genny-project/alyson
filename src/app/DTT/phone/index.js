import { Input, Text, useClipboard, useToast, HStack } from '@chakra-ui/react'
import phoneNumberFormatter from 'utils/formatters/phone-number'
import { faPhoneAlt } from '@fortawesome/free-solid-svg-icons'
import { FontAwesomeIcon } from '@fortawesome/react-fontawesome'
import HeroIconButton from 'app/layouts/components/hero_icon_button'

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
    <HStack spacing={2}>
      <HeroIconButton onClick={onClick} icon={<FontAwesomeIcon size="sm" icon={faPhoneAlt} />} />
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
    w='25vw'
  />
)

const Phone = {
  Write,
  Read,
}

export default Phone
