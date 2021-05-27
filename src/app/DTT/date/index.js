import { includes } from 'ramda'
import { Text, Input } from '@chakra-ui/react'

import timeBasedOnTimeZone from 'utils/helpers/timezone_magic/time-based-on-timezone'
import DateChip from './DateChip'
import getDate from 'utils/helpers/timezone_magic/get-date'
import Year from './Year'
import { useMobileValue } from 'utils/hooks'
import safelyParseDate from 'utils/helpers/safely-parse-date'

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
    <Text minW="4rem" {...config}>
      {date}
    </Text>
  )
}
const Write = ({ questionCode, data, onSendAnswer, typeName }) => {
  const includeTime = includes('LocalDateTime', typeName)
  const onlyYear = typeName === 'year'

  const handleChange = e => onSendAnswer(safelyParseDate(e.target.value).toISOString())

  const maxW = useMobileValue(['', '25vw'])

  return data?.value ? (
    <DateChip
      onlyYear={onlyYear}
      includeTime={includeTime}
      onClick={() => onSendAnswer('')}
      date={getDate(data?.value)}
    />
  ) : onlyYear ? (
    <Year questionCode={questionCode} handleChange={handleChange} />
  ) : (
    <Input
      test-id={questionCode}
      type={includeTime ? 'datetime-local' : 'date'}
      onBlur={handleChange}
      w="full"
      maxW={maxW}
    />
  )
}

const DatePicker = {
  Write,
  Read,
}

export default DatePicker
