import { compose, equals, includes, map, pathOr } from 'ramda'
import { selectCode, selectRows } from 'redux/db/selectors'

import { Select as CSelect } from 'chakra-react-select'
import { Text } from '@chakra-ui/react'
import { apiConfig } from 'config/get-api-config'
import debounce from 'lodash.debounce'
import { getValue } from './get-value'
import { onSendMessage } from 'vertx'
import safelyParseJson from 'utils/helpers/safely-parse-json'
import { selectBufferDropdownOptions } from 'redux/app/selectors'
import { useMobileValue } from 'utils/hooks'
import { useSelector } from 'react-redux'
import { useState, useEffect, useCallback } from 'react'

const Write = ({
  questionCode,
  placeholderName,
  onSendAnswer,
  component,
  dataType,
  data,
  targetCode,
  parentCode,
  attributeCode,
}) => {
  const dropdownData = useSelector(selectCode(`${parentCode}-${questionCode}-options`)) || []
  const options = compose(map(({ code, name }) => ({ label: name, value: code })))(dropdownData)
  const isMulti = includes('multiple', dataType.typeName || '') || component === 'tag'
  const processId = useSelector(selectCode(questionCode, 'processId'))
  const sourceCode = useSelector(selectCode('USER'))
  const maxW = useMobileValue(['', '25vw'])
  const clientId = apiConfig?.clientId

  const ddEvent = value => {
    setValue(value)

    debounce(
      value =>
        onSendMessage(
          {
            sourceCode,
            targetCode,
            value,
            parentCode,
            questionCode,
            code: questionCode,
            processId: processId,
          },
          { event_type: 'DD', redirect: false, attributeCode, questionCode, code: questionCode },
        ),
      500,
    )
  }

  const getBufferedDropdownOptions = useSelector(selectBufferDropdownOptions)

  const getValue = useCallback(
    data => {
      const optionsIncludingBufferedOptions = [...getBufferedDropdownOptions, ...options]
      let defaultValue = safelyParseJson(data?.value, [])
      defaultValue =
        defaultValue &&
        Array.isArray(defaultValue) &&
        optionsIncludingBufferedOptions.filter(i => defaultValue.includes(i.value))
      return defaultValue
    },
    [getBufferedDropdownOptions, options],
  )

  const [value, setValue] = useState(getValue(data))

  useEffect(() => {
    setValue(getValue(data))
  }, [data, setValue, getValue])

  // the backend accepts array only when sending dropdown values regardless of multi or single select
  const prepareValueForSendingAnswer = (value, isMulti) =>
    isMulti ? value && Array.isArray(value) && value.map(i => i.value) : [value.value]

  return equals(clientId)('lojing') ? (
    <CSelect
      useBasicStyles
      isMulti={isMulti}
      options={options}
      onChange={value => onSendAnswer(prepareValueForSendingAnswer(value, isMulti))}
      onInputChange={value => ddEvent(value)}
      onFocus={() => ddEvent('')}
      placeholder={!options.length ? 'Start typing to search' : placeholderName || 'Select'}
      test-id={questionCode}
      id={questionCode}
      value={value || ''}
      chakraStyles={{
        container: provided => ({
          ...provided,
          maxW: maxW,
        }),
        control: provided => ({
          ...provided,
          bg: 'product.gray',
          borderColor: 'product.gray',
          cursor: 'pointer',
          fontSize: '0.875rem',
          fontWeight: '500',
          _hover: {
            borderColor: 'product.secondary',
            boxShadow: 'lg',
          },
          _focus: {
            borderColor: 'product.secondary',
            boxShadow: 'inherit',
          },
        }),
        menuList: provided => ({
          ...provided,
          paddingInline: 10,
          paddingBlock: 2,
        }),
      }}
    />
  ) : (
    <CSelect
      useBasicStyles
      isMulti={isMulti}
      options={options}
      onChange={value => onSendAnswer(prepareValueForSendingAnswer(value, isMulti))}
      onInputChange={value => ddEvent(value)}
      onFocus={() => ddEvent('')}
      placeholder={!options.length ? 'Start typing to search' : placeholderName || 'Select'}
      test-id={questionCode}
      id={questionCode}
      value={value || ''}
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
