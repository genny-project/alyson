import { useState } from 'react'
import { filter, identity, includes, map, prop } from 'ramda'
import { useSelector } from 'react-redux'
import { selectCodes, selectRows } from 'redux/db/selectors'
import { Read } from 'app/DTT/text'
import { Select as CSelect, Text, Box } from '@chakra-ui/react'
import { CUIAutoComplete } from 'chakra-ui-autocomplete'

const Multiple = ({ label, data, onSendAnswer, placeholder, optionData }) => {
  const [selected, setSelected] = useState(data?.value || [])

  const options = map(
    ({ value, baseEntityCode }) => ({ label: value, value: baseEntityCode }),
    filter(identity, optionData),
  )

  return !options.length ? (
    <Text>Waiting on another answer</Text>
  ) : (
    <Box marginBottom="-10">
      <CUIAutoComplete
        label={label}
        placeholder={placeholder}
        items={options}
        selectedItems={selected}
        listStyleProps={{ bg: 'gray.500' }}
        listItemStyleProps={{ color: 'gray.900' }}
        onSelectedItemsChange={changes => {
          setSelected(changes.selectedItems)
          onSendAnswer(map(prop('value'), changes.selectedItems || []))
        }}
      />
    </Box>
  )
}

const Write = ({ label, placeholder, onSendAnswer, groupCode, component, dataType, data }) => {
  const options = useSelector(selectRows(groupCode))
  const optionData = useSelector(selectCodes(options, 'PRI_NAME'))

  const { typeName } = dataType
  const multiple = includes('multiple', typeName || '') || component === 'tag'

  if (multiple)
    return (
      <Multiple
        data={data}
        onSendAnswer={onSendAnswer}
        placeholder={placeholder}
        optionData={optionData}
        label={label}
      />
    )

  return !options.length ? (
    <Text>Waiting on another answer</Text>
  ) : (
    <CSelect
      placeholder={placeholder}
      test-id={groupCode}
      onChange={e => onSendAnswer(e.target.value)}
      defaultValue={data?.value}
    >
      {optionData &&
        optionData.map(
          option =>
            option && (
              <option key={option.baseEntityCode} value={option.baseEntityCode}>
                {option.value}
              </option>
            ),
        )}
    </CSelect>
  )
}

const Select = {
  Write,
  Read,
}

export default Select
