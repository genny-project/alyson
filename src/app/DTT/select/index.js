import { useState } from 'react'
import { filter, identity, includes, map, prop, find, propEq, pathOr } from 'ramda'
import { useSelector } from 'react-redux'
import { selectCodes, selectRows } from 'redux/db/selectors'
import { Select as CSelect, Text, Box } from '@chakra-ui/react'
import { CUIAutoComplete } from 'chakra-ui-autocomplete'
import safelyParseJson from 'utils/helpers/safely-parse-json'

const getValue = (data, options) =>
  map(opt => find(propEq('value', opt))(options), safelyParseJson(data?.value, []))

const Multiple = ({ label, value, onSendAnswer, placeholder, optionData }) => {
  const options = map(
    ({ value, baseEntityCode }) => ({ label: value, value: baseEntityCode }),
    filter(identity, optionData),
  )
  const [selected, setSelected] = useState(value)

  return !options.length ? (
    <Text>Waiting on another answer</Text>
  ) : (
    <Box marginBottom="-10" maxW="2xl">
      <CUIAutoComplete
        label={label}
        placeholder={placeholder}
        items={options}
        selectedItems={selected}
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

  const value = getValue(data, options)

  if (multiple)
    return (
      <Multiple
        value={value}
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
      placeholder={placeholder || label}
      test-id={groupCode}
      onChange={e => onSendAnswer([e.target.value])}
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

const getGroupFromDTT = pathOr('', ['validationList', 0, 'selectionBaseEntityGroupList', 0])

const Read = ({ data, dataType }) => {
  const groupCode = getGroupFromDTT(dataType)
  const options = useSelector(selectRows(groupCode))

  const value = getValue(data, options)

  return <div>{`${value}`}</div>
}

const Select = {
  Write,
  Read,
}

export default Select
