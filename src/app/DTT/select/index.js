import { useEffect, useRef } from 'react'
import { compose, includes, isEmpty, map, pathOr, reduce, uniq } from 'ramda'
import { useSelector } from 'react-redux'
import { Text, Select as CSelect } from '@chakra-ui/react'
import debounce from 'lodash.debounce'
import { selectCode, selectRows } from 'redux/db/selectors'
import safelyParseJson from 'utils/helpers/safely-parse-json'
import { getValue } from './get-value'
import { onSendMessage } from 'vertx'
import Autocomplete from './Autocomplete'

const Write = ({
  questionCode,
  placeholder,
  onSendAnswer,
  groupCode,
  component,
  dataType,
  data,
  targetCode,
  config,
  parentCode,
}) => {
  const previousDropDownRef = useRef([])
  const previousDropDownDataValue = previousDropDownRef.current

  const getUniqueValuesFromTwoArrays = firstArray => secondArray =>
    reduce(
      (acc, value) => (!includes(value)(acc) ? acc.concat(value) : acc),
      secondArray,
    )(firstArray)

  const sourceCode = useSelector(selectCode('USER'))
  const { typeName } = dataType
  const multiple = includes('multiple', typeName || '') || component === 'tag'
  const dropdownData = useSelector(selectCode(`${parentCode}-${questionCode}-options`)) || []
  const allDropDownData = getUniqueValuesFromTwoArrays(dropdownData)(previousDropDownDataValue)

  const options = compose(map(({ code, name }) => ({ label: name, value: code })))(allDropDownData)
  const labelOptions = compose(map(({ code, name }) => ({ label: name, value: code })))(
    dropdownData,
  )
  const uniqueOptions = uniq([...options])

  console.log(
    '%c OPTIONS ------>',
    'color: crimson; font-size: 20px',
    options,
    uniqueOptions,
    labelOptions,
  )

  const { attributeCode } = data || {}

  useEffect(() => {
    previousDropDownRef.current = !isEmpty(dropdownData)
      ? dropdownData
      : previousDropDownRef.current
  })

  const ddEvent = debounce(
    value =>
      onSendMessage(
        {
          sourceCode,
          targetCode,
          value,
          parentCode,
          questionCode,
          code: questionCode,
        },
        { event_type: 'DD', redirect: false, attributeCode, questionCode, code: questionCode },
      ),
    500,
  )

  const defaultValue = safelyParseJson(data?.value, [])

  const { simpleSelect } = config || {}

  if (simpleSelect)
    return (
      <CSelect
        onChange={e => onSendAnswer(e.target.value)}
        placeholder={placeholder || 'Select'}
        test-id={`simpleSelect-${questionCode}`}
      >
        {options.map(({ value, label }) => (
          <option test-id={value} value={value} key={value}>
            {label}
          </option>
        ))}
      </CSelect>
    )

  return (
    <Autocomplete
      placeholder={!options.length ? 'Start typing to search' : placeholder || 'Select'}
      options={uniqueOptions}
      labelOptions={labelOptions}
      onChange={onSendAnswer}
      defaultValue={defaultValue}
      multiple={multiple}
      ddEvent={ddEvent}
      questionCode={questionCode}
      groupCode={groupCode}
    />
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
