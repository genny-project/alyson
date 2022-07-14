import { compose, includes, map, pathOr } from 'ramda'
import { selectCode, selectRows } from 'redux/db/selectors'

import { Select as CSelect } from 'chakra-react-select'
import { Text } from '@chakra-ui/react'
import debounce from 'lodash.debounce'
import { getValue } from './get-value'
import { onSendMessage } from 'vertx'
import safelyParseJson from 'utils/helpers/safely-parse-json'
import { selectBufferDropdownOptions } from 'redux/app/selectors'
import { useMobileValue } from 'utils/hooks'
import { useSelector } from 'react-redux'

const Write = ({
  questionCode,
  placeholder,
  onSendAnswer,
  component,
  dataType,
  data,
  targetCode,
  parentCode,
  attributeCode,
  properties,
  realm,
}) => {
  const dropdownData = useSelector(selectCode(`${parentCode}-${questionCode}-options`)) || []
  const options = compose(map(({ code, name }) => ({ label: name, value: code })))(dropdownData)
  const isMulti = includes('multiple', dataType.typeName || '') || component === 'tag'
  const processId = useSelector(selectCode(questionCode, 'processId'))
  const sourceCode = useSelector(selectCode('USER'))
  const maxW = useMobileValue(['', '25vw'])

  const fieldBgColor = properties.fieldBgColor
  const secondaryColor = properties.secondaryColor

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

  const getBufferedDropdownOptions = useSelector(selectBufferDropdownOptions)
  const optionsIncludingBufferedOptions = [...getBufferedDropdownOptions, ...options]
  let defaultValue = safelyParseJson(data?.value, [])
  defaultValue =
    defaultValue &&
    Array.isArray(defaultValue) &&
    optionsIncludingBufferedOptions.filter(i => defaultValue.includes(i.value))

  // the backend accepts array only when sending dropdown values regardless of multi or single select
  const prepareValueForSendingAnswer = (value, isMulti) =>
    isMulti ? value && Array.isArray(value) && value.map(i => i.value) : [value.value]

  return realm === 'lojing' ? (
    <CSelect
      useBasicStyles
      isMulti={isMulti}
      options={options}
      onChange={value => onSendAnswer(prepareValueForSendingAnswer(value, isMulti))}
      onInputChange={value => ddEvent(value)}
      onFocus={() => ddEvent('')}
      placeholder={!options.length ? 'Start typing to search' : placeholder || 'Select'}
      test-id={questionCode}
      id={questionCode}
      defaultValue={defaultValue}
      chakraStyles={{
        container: provided => ({
          ...provided,
          maxW: maxW,
        }),
        control: provided => ({
          ...provided,
          bg: fieldBgColor,
          borderColor: fieldBgColor,
          cursor: 'pointer',
          fontSize: '0.875rem',
          fontWeight: '500',
          _hover: {
            borderColor: secondaryColor,
            boxShadow: 'lg',
          },
          _focus: {
            borderColor: secondaryColor,
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
