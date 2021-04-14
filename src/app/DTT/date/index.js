import { includes } from 'ramda'
import { Text, Input, Badge, HStack } from '@chakra-ui/react'
import timeBasedOnTimeZone from 'utils/helpers/timezone_magic/time-based-on-timezone.ts'
import { FontAwesomeIcon } from '@fortawesome/react-fontawesome'
import { faTimes } from '@fortawesome/free-solid-svg-icons'

const Read = ({ data, typeName, config }) => {
  const includeTime = includes('LocalDateTime', typeName)

  if (!data.value) return null

  const date = timeBasedOnTimeZone(new Date(data.value + 'Z'), { includeTime })

  if (date === 'Invalid Date') return null
  return (
    <Text textStyle="tail2" {...config}>
      {date}
    </Text>
  )
}
const Write = ({ questionCode, data, onSendAnswer, typeName }) => {
  const includeTime = includes('LocalDateTime', typeName)
  const onlyYear = typeName === 'year'

  const handleChange = e => e.target.value && onSendAnswer(new Date(e.target.value).toISOString())

  return data?.value ? (
    <Badge colorScheme="purple" cursor="pointer" onClick={() => onSendAnswer(null)}>
      <HStack padding="1">
        <FontAwesomeIcon icon={faTimes} />
        <Text>{timeBasedOnTimeZone(new Date(data.value))}</Text>
      </HStack>
    </Badge>
  ) : (
    <Input
      test-id={questionCode}
      type={onlyYear ? 'number' : includeTime ? 'datetime-local' : 'date'}
      onBlur={handleChange}
    />
  )
}

const DatePicker = {
  Write,
  Read,
}

export default DatePicker
