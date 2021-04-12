import { includes } from 'ramda'
import { Text, Input } from '@chakra-ui/react'
import timeBasedOnTimeZone from 'utils/helpers/timezone_magic/time-based-on-timezone.ts'

const Read = ({ data, typeName }) => {
  const includeTime = includes('LocalDateTime', typeName)

  if (!data.value) return null

  const date = timeBasedOnTimeZone(new Date(data.value + 'Z'), { includeTime })

  if (date === 'Invalid Date') return null
  return <Text textStyle="tail2">{date}</Text>
}
const Write = ({ questionCode, data, onSendAnswer, typeName }) => {
  const includeTime = includes('LocalDateTime', typeName)
  const onlyYear = typeName === 'year'

  const handleChange = e => e.target.value && onSendAnswer(new Date(e.target.value).toISOString())

  return (
    <Input
      test-id={questionCode}
      defaultValue={data?.value}
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
