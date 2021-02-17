import { includes } from 'ramda'
import ReactDatePicker from 'react-datepicker'
import 'react-datepicker/dist/react-datepicker.css'
import './date-picker.css'
import { Text, Input } from '@chakra-ui/react'
import dateFormatter from 'utils/formatters/date'
import { parseISO } from 'date-fns'
const Read = ({ data, size }) => {
  const date = dateFormatter(data?.value)

  if (!date) return null
  return (
    <Text w="8rem" fontSize={size}>
      {date}
    </Text>
  )
}
const Write = ({ questionCode, data, onSendAnswer, typeName }) => {
  const includeTime = includes('LocalDateTime', typeName)
  const onlyYear = typeName === 'year'

  const selected = data?.value ? parseISO(data.value) : null

  return (
    <Input
      test-id={questionCode}
      defaultValue={selected}
      type={onlyYear ? 'number' : includeTime ? 'datetime-local' : 'date'}
      onBlur={e => onSendAnswer(e.target.value)}
    />
  )
}

const DatePicker = {
  Write,
  Read,
}

export default DatePicker
