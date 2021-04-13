import { filter, identity, map } from 'ramda'
import { Text } from '@chakra-ui/react'
import { getValue } from './get-value'
import Autocomplete from './Autocomplete'

export const Multiple = ({ questionCode, data, onSendAnswer, placeholder, optionData }) => {
  const options = map(
    ({ value, baseEntityCode }) => ({ label: value, value: baseEntityCode }),
    filter(identity, optionData),
  )

  return !options.length ? (
    <Text fontStyle="tail1" color="grey">
      Waiting on another answer
    </Text>
  ) : (
    <Autocomplete
      questionCode={questionCode}
      defaultValue={data?.value ? getValue(data, options) : []}
      options={filter(identity, options || [])}
      placeholder={placeholder || 'Select'}
      onChange={onSendAnswer}
    />
  )
}
