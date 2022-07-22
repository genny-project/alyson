import './styles.css'

import { compose, includes, isEmpty, map, pathOr } from 'ramda'
import { selectCode, selectRows } from 'redux/db/selectors'

import { Select as CSelect } from 'chakra-react-select'
import { Text } from '@chakra-ui/react'
import { apiConfig } from 'config/get-api-config'
import debounce from 'lodash.debounce'
import { getValue } from './get-value'
import { onSendMessage } from 'vertx'
import { useEffect, useState } from 'react'
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
  const dropdownData =
    useSelector(
      selectCode(`${parentCode}-${questionCode}-options`),
      /// Checking this way means that if left or right is undefined, the comparison still works as expected.
      /// Without the length checks I found this comparison didn't tend to behave as expected
      (left, right) => (left?.length || -1) === (right?.length || -2),
    ) || []
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

  useEffect(() => {
    /// If the dropdown data doesn't exist yet, we need to get it
    if (isEmpty(dropdownData)) {
      ddEvent('')
    }
    setValue(getValue(data, options))
    // I found that adding options on its own to this array just caused infinite re-renders
    // eslint-disable-next-line react-hooks/exhaustive-deps
  }, [data, options?.length])

  // the backend accepts array only when sending dropdown values regardless of multi or single select
  const prepareValueForSendingAnswer = (value, isMulti) =>
    isMulti ? value && Array.isArray(value) && value.map(i => i.value) : [value.value]

  return (
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
          paddingInline: '0.5rem',
          paddingBlock: '0.5rem',
          bg: 'product.gray',
          borderRadius: 'calc(0.25rem - 1px)',
          borderColor: 'product.gray',
          fontSize: '0.875rem',
          fontWeight: '500',
          color: 'product.darkGray',
          cursor: 'pointer',
          _hover: {
            borderColor: 'product.gray',
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
          borderRadius: '0.25rem 0.25rem 1.25rem 1.25rem',
          boxShadow: '0px 4px 15px -2px rgba(0, 0, 0, 0.25)',
          zIndex: 100,
        }),
        menuList: provided => ({
          ...provided,
          paddingBlock: 0,
          border: 0,
          borderRadius: '0.25rem 0.25rem 1.25rem 1.25rem',
        }),
        option: provided => ({
          ...provided,
          paddingInlineStart: 10,
          paddingInlineEnd: 3,
          paddingBlock: 2,
          borderRadius: '1.25rem',
          bg: '#fff',
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
