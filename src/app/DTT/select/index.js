import './styles.css'

import { compose, equals, includes, map, pathOr, isEmpty } from 'ramda'
import { selectCode, selectRows } from 'redux/db/selectors'

import { Select as CSelect } from 'chakra-react-select'
import { Text } from '@chakra-ui/react'
import { apiConfig } from 'config/get-api-config'
import debounce from 'lodash.debounce'
import { getValue, onlyValue } from './get-value'
import { onSendMessage } from 'vertx'
import safelyParseJson from 'utils/helpers/safely-parse-json'
import { selectBufferDropdownOptions } from 'redux/app/selectors'
import { useCallback, useEffect, useState } from 'react'
import { useSelector } from 'react-redux'

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
  const clientId = apiConfig?.clientId
  const [value, setValue] = useState(getValue(data, options))

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
          processId: processId,
        },
        { event_type: 'DD', redirect: false, attributeCode, questionCode, code: questionCode },
      ),
    500,
  )

  //const getBufferedDropdownOptions = useSelector(selectBufferDropdownOptions)

  // const getDefaultValue = useCallback(
  //   data => {
  //     const optionsIncludingBufferedOptions = [...getBufferedDropdownOptions, ...options]
  //     let defaultValue = safelyParseJson(data?.value, [])
  //     defaultValue =
  //       defaultValue &&
  //       Array.isArray(defaultValue) &&
  //       optionsIncludingBufferedOptions.filter(i => defaultValue.includes(i.value))
  //     return defaultValue
  //   },
  //   [getBufferedDropdownOptions, options],
  // )

  useEffect(() => {
    let d = getValue(safelyParseJson(data?.value, [], options))
    console.log(d)
    setValue(d)
  }, [data])

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
      value={value}
      classNamePrefix={clientId + '_dd'}
      selectedOptionStyle="check"
      chakraStyles={{
        container: provided => ({
          ...provided,
        }),
        control: provided => ({
          ...provided,
          bg: 'product.gray',
          borderColor: 'product.gray',
          cursor: 'pointer',
          fontSize: '0.875rem',
          fontWeight: '500',
          paddingInline: '0.5rem',
          paddingBlock: '0.5rem',
          color: 'product.darkGray',
          _hover: {
            borderColor: 'product.secondary',
            boxShadow: 'lg',
          },
          _focus: {
            borderColor: 'product.secondary',
            boxShadow: 'inherit',
          },
        }),
        menu: provided => ({
          ...provided,
          marginBlock: 0,
          paddingBlock: 0,
          border: 0,
          borderRadius: '0.25rem 0.25rem 0.75rem 0.75rem',
          boxShadow: '0px 4px 15px -2px rgba(0, 0, 0, 0.25)',
          zIndex: 100,
        }),
        menuList: provided => ({
          ...provided,
          paddingBlock: 0,
          border: 0,
          borderRadius: '0.25rem 0.25rem 0.75rem 0.75rem',
        }),
        option: provided => ({
          ...provided,
          paddingInlineStart: 10,
          paddingInlineEnd: 3,
          paddingBlock: 2,
          fontSize: '0.875rem',
          fontWeight: '500',
          color: 'product.darkGray',
          _hover: {
            bg: 'product.secondary',
            color: '#fff',
          },
        }),
        noOptionsMessage: provided => ({
          ...provided,
          fontSize: '0.875rem',
          fontWeight: '500',
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
      value={value}
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
