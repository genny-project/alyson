import { includes } from 'ramda'
import { Text, Input } from '@chakra-ui/react'
import dateFormatter from 'utils/formatters/date'

const Read = ({ data, size, typeName }) => {
  const includeTime = includes('LocalDateTime', typeName)
  // const onlyYear = typeName === 'year'

  const date = dateFormatter(data?.value, includeTime)

  if (!date) return null
  return (
    <Text w="10rem" fontSize={size}>
      {date}
    </Text>
  )
}
const Write = ({ questionCode, data, onSendAnswer, typeName }) => {
  const includeTime = includes('LocalDateTime', typeName)
  const onlyYear = typeName === 'year'

  return (
    <Input
      test-id={questionCode}
      defaultValue={data?.value}
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
