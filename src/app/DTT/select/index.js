import { useEffect, useState } from 'react'
import { filter, identity, includes, map, prop, find, propEq, pathOr } from 'ramda'
import { useSelector } from 'react-redux'
import { selectCodes, selectRows } from 'redux/db/selectors'
import { Select as CSelect, Text, Box } from '@chakra-ui/react'
import { CUIAutoComplete } from 'chakra-ui-autocomplete'
import safelyParseJson from 'utils/helpers/safely-parse-json'

const getValue = (data, options) =>
  map(opt => find(propEq('value', opt))(options), safelyParseJson(data?.value, []))

const Multiple = ({ questionCode, label, data, onSendAnswer, placeholder, optionData }) => {
  const options = map(
    ({ value, baseEntityCode }) => ({ label: value, value: baseEntityCode }),
    filter(identity, optionData),
  )
  const [selected, setSelected] = useState(getValue(data, options))

  useEffect(() => {
    if (data.value === '') setSelected([])
  }, [data.value])

  return !options.length ? (
    <Text>Waiting on another answer</Text>
  ) : (
    <Box marginBottom="-10" maxW="2xl" test-id={questionCode}>
      <CUIAutoComplete
        label={label}
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

const Write = ({
  questionCode,
  label,
  placeholder,
  onSendAnswer,
  groupCode,
  component,
  dataType,
  data,
}) => {
  const options = useSelector(selectRows(groupCode))
  const optionData = useSelector(selectCodes(options, 'PRI_NAME'))

  const { typeName } = dataType
  const multiple = includes('multiple', typeName || '') || component === 'tag'

  if (multiple)
    return (
      <Multiple
        questionCode={questionCode}
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
      rootProps={{
        'test-id': questionCode,
      }}
      onChange={e => onSendAnswer([e.target.value])}
      defaultValue={safelyParseJson(data?.value)}
    >
      {optionData &&
        optionData.map(
          option =>
            option && (
              <option
                test-id={option.baseEntityCode}
                key={option.baseEntityCode}
                value={option.baseEntityCode}
              >
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

  return <Text noOfLines={3}>{`${value}`}</Text>
}

const Select = {
  Write,
  Read,
}

export default Select
