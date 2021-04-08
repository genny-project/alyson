import { useEffect, useState } from 'react'
import { filter, identity, map, prop } from 'ramda'
import { Box, Text } from '@chakra-ui/react'
import { CUIAutoComplete } from 'chakra-ui-autocomplete'
import { getValue } from './get-value'

export const Multiple = ({ questionCode, data, onSendAnswer, placeholder, optionData }) => {
  const options = map(
    ({ value, baseEntityCode }) => ({ label: value, value: baseEntityCode }),
    filter(identity, optionData),
  )
  const [selected, setSelected] = useState(getValue(data, options))

  useEffect(() => {
    if (data.value === '') setSelected([])
  }, [data.value])

  return !options.length ? (
    <Text fontStyle="tail1" color="grey">
      Waiting on another answer
    </Text>
  ) : (
    <Box maxW="53vw">
      <CUIAutoComplete
        test-id={questionCode}
        placeholder={placeholder}
        items={filter(identity, options || [])}
        selectedItems={filter(identity, selected)}
        onSelectedItemsChange={changes => {
          setSelected(changes.selectedItems)
          onSendAnswer(map(prop('value'), changes.selectedItems || []))
        }}
      />
    </Box>
  )
}
