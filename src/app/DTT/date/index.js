import { includes } from 'ramda'
import ReactDatePicker from 'react-datepicker'
import 'react-datepicker/dist/react-datepicker.css'
import './date-picker.css'
import { Text } from '@chakra-ui/react'
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

  const selected = data?.value ? parseISO(data.value) : null

  try {
    return (
      <ReactDatePicker
        test-id={questionCode}
        showTimeSelect={includeTime}
        selected={selected}
        onChange={onSendAnswer}
        isClearable
        inline
      />
    )
  } catch (err) {
    return (
      <ReactDatePicker showTimeSelect={includeTime} onChange={onSendAnswer} isClearable inline />
    )
  }
}

const DatePicker = {
  Write,
  Read,
}

export default DatePicker
