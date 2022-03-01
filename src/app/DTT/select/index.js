import { Select as CSelect, Text } from '@chakra-ui/react'
import { compose, includes, isEmpty, map, pathOr } from 'ramda'
import { selectCode, selectRows } from 'redux/db/selectors'
import { useEffect, useRef } from 'react'

import Autocomplete from './Autocomplete'
import debounce from 'lodash.debounce'
import { getValue } from './get-value'
import { onSendMessage } from 'vertx'
import safelyParseJson from 'utils/helpers/safely-parse-json'
import { useSelector } from 'react-redux'

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
  attributeCode,
}) => {
  const previousDropDownRef = useRef([])

  const sourceCode = useSelector(selectCode('USER'))
  const { typeName } = dataType
  const multiple = includes('multiple', typeName || '') || component === 'tag'
  const dropdownData = useSelector(selectCode(`${parentCode}-${questionCode}-options`)) || []

  const options = compose(map(({ code, name }) => ({ label: name, value: code })))(dropdownData)

  // const { attributeCode } = data || {}

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
        onChange={e => {
          onSendAnswer(e.target.value)
        }}
        placeholder={placeholder || 'Select'}
        test-id={`simpleSelect-${questionCode}`}
        id={questionCode}
        paddingBlock={3}
        paddingInline={5}
        fontWeight={'medium'}
        borderColor={'gray.700'}
        background={'light'}
        _hover={{
          borderColor: 'primary.500',
          boxShadow: 'lg',
        }}
        _focusVisible={{
          borderColor: 'primary.500',
          boxShadow: 'initial',
        }}
        _invalid={{
          borderColor: 'error.500',
          background: 'error.50',
          color: 'error.500',
        }}
        _disabled={{
          borderColor: 'gray.300',
          background: 'gray.100',
        }}
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
      options={options}
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
