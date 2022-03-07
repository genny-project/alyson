import { Select as CSelect, Text } from '@chakra-ui/react'
import { compose, includes, isEmpty, map, pathOr } from 'ramda'
import { selectCode, selectRows } from 'redux/db/selectors'
import { useState, useEffect, useRef } from 'react'

import Autocomplete from './Autocomplete'
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
  let regex
  const [errorStatus, setErrorStatus] = useState(false)
  const { dispatch } = useError()

  console.log('%c 🙀', 'background: tomato; color: silver; padding: 0.5rem', {
    errorStatus,
  })

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
  try {
    regex = RegExp(regexPattern)
  } catch (err) {
    console.error('There is an error with the regex', questionCode, err)
    regex = undefined
  }

  const isInvalid = getIsInvalid(data?.value)(regex)

  console.log('%c 🙀', 'background: blue; color: silver; padding: 0.5rem', {
    errorStatus,
    isInvalid,
  })

  useEffect(() => {
    isInvalid ? setErrorStatus(true) : setErrorStatus(false)
  }, [isInvalid])

  useEffect(() => {
    isInvalid
      ? dispatch({ type: ACTIONS.SET_TO_TRUE, payload: questionCode })
      : dispatch({ type: ACTIONS.SET_TO_FALSE, payload: questionCode })
  }, [dispatch, isInvalid, questionCode])

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
