import { includes } from 'ramda'
import { Text, Input } from '@chakra-ui/react'

import timeBasedOnTimeZone from 'utils/helpers/timezone_magic/time-based-on-timezone.ts'
import DateChip from './DateChip'
import getDate from 'utils/helpers/timezone_magic/get-date'
import { useMobileValue } from 'utils/hooks'

const Read = ({ data, typeName, config }) => {
  const includeTime = includes('LocalDateTime', typeName)
  const onlyYear = typeName === 'year'

  if (!data.value) return null

  const date = timeBasedOnTimeZone(
    includes('Z', data.value || '') ? new Date(data.value) : new Date(data.value + 'Z'),
    { includeTime, onlyYear },
  )

  if (date === 'Invalid Date') return null
  return (
    <Text textStyle="tail.2" {...config}>
      {date}
    </Text>
  )
}
const Write = ({ questionCode, data, onSendAnswer, typeName }) => {
  const includeTime = includes('LocalDateTime', typeName)
  const onlyYear = typeName === 'year'

  const handleChange = e => e.target.value && onSendAnswer(new Date(e.target.value).toISOString())
  const width = useMobileValue(['100%', '25vw'])

  return data?.value ? (
    <DateChip
      onlyYear={onlyYear}
      includeTime={includeTime}
      onClick={() => onSendAnswer('')}
      date={getDate(data?.value)}
    />
  ) : onlyYear ? (
    <Input type="number" placeholder="e.g. 2012" onBlur={handleChange} w={width} />
  ) : (
    <Input
      test-id={questionCode}
      type={includeTime ? 'datetime-local' : 'date'}
      onBlur={handleChange}
      w={width}
    />
  )
}

const DatePicker = {
  Write,
  Read,
}

export default DatePicker
