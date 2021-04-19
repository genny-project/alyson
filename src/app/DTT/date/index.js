import { includes } from 'ramda'
import { Text, Input } from '@chakra-ui/react'
import timeBasedOnTimeZone from 'utils/helpers/timezone_magic/time-based-on-timezone.ts'
import DateChip from './DateChip'

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
    <DateChip onClick={() => onSendAnswer(null)} date={new Date(data.value)} />
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
