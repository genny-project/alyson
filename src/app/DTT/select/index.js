import { Text } from '@chakra-ui/react'
import { compose, includes, map, pathOr } from 'ramda'
import { selectCode, selectRows } from 'redux/db/selectors'
import { Select as CSelect } from 'chakra-react-select'
import debounce from 'lodash.debounce'

import { getValue } from './get-value'
import { onSendMessage } from 'vertx'
import safelyParseJson from 'utils/helpers/safely-parse-json'
import { useSelector } from 'react-redux'
import { getIsInvalid } from 'utils/functions'
import { ACTIONS } from 'utils/contexts/ErrorReducer'
import { useError } from 'utils/contexts/ErrorContext'

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
  regexPattern = '.*',
}) => {
  const dropdownData = useSelector(selectCode(`${parentCode}-${questionCode}-options`)) || []
  const options = compose(map(({ code, name }) => ({ label: name, value: code })))(dropdownData)
  const isMulti = includes('multiple', dataType.typeName || '') || component === 'tag'
  const defaultValue = safelyParseJson(data?.value, [])

  const sourceCode = useSelector(selectCode('USER'))

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

  return (
    <CSelect
      isMulti={isMulti}
      options={options}
      onChange={value => {
        onSendAnswer(value)
      }}
      onInputChange={value => {
        ddEvent(value)
      }}
      onFocus={() => ddEvent('')}
      placeholder={!options.length ? 'Start typing to search' : placeholder || 'Select'}
      test-id={questionCode}
      id={questionCode}
      defaultValue={defaultValue}
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
