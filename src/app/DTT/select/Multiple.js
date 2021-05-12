import { filter, identity, map } from 'ramda'
import { Text } from '@chakra-ui/react'
import { getValue } from './get-value'
import Autocomplete from './Autocomplete'

export const Multiple = ({
  ddEvent,
  questionCode,
  data,
  onSendAnswer,
  placeholder,
  optionData,
}) => {
  const options = map(
    ({ code, name }) => ({ label: name, value: code }),
    filter(identity, optionData || []),
  )

  return !options.length ? (
    <Text fontStyle="tail.1" color="grey">
      {` Waiting on another answer`}
    </Text>
  ) : (
    <Autocomplete
      ddEvent={ddEvent}
      questionCode={questionCode}
      defaultValue={data?.value ? getValue(data, options) : []}
      options={options}
      placeholder={placeholder || 'Select'}
      onChange={onSendAnswer}
    />
  )
}
