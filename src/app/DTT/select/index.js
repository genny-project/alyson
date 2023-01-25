import './styles.css'

import { Box, HStack, Text, useTheme } from '@chakra-ui/react'
import { equals, includes, isEmpty, pathOr } from 'ramda'
import { selectCode, selectRows } from 'redux/db/selectors'
import { useSelector } from 'react-redux'
import { useEffect, useState } from 'react'

import { Select as CSelect } from 'chakra-react-select'
import { FontAwesomeIcon } from '@fortawesome/react-fontawesome'
import debounce from 'lodash.debounce'
import { faCheckCircle } from '@fortawesome/free-solid-svg-icons'
import { getValue } from './get-value'
import { isNotStringifiedEmptyArray } from 'utils/functionals'
import mapOptions from './map-options'
import { onSendMessage } from 'vertx'
import { useError } from 'utils/contexts/ErrorContext'
import useGetFieldMessage from 'utils/fieldMessage'
import { useIsFieldNotEmpty } from 'utils/contexts/IsFieldNotEmptyContext'
import useProductColors from 'utils/productColors'
import ErrorDisplay from 'app/DTT/helpers/error-display'
import useClearFieldMessage from 'app/DTT/helpers/clear-field-message'

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
  mandatory,
  clientId,
  config,
}) => {
  const dropdownData =
    useSelector(
      selectCode(`${parentCode}-${questionCode}-options`),
      /// Checking this way means that if left or right is undefined, the comparison still works as expected.
      /// Without the length checks I found this comparison didn't tend to behave as expected
      (left, right) => (left?.length || -1) === (right?.length || -2),
    ) || []

  const options = mapOptions(dropdownData)
  const isMulti = includes('multiple', dataType.typeName || '') || component === 'tag'
  const processId = useSelector(selectCode(questionCode, 'processId'))
  const sourceCode = useSelector(selectCode('USER'))

  const [value, setValue] = useState(getValue(data, options))
  const [updated, setUpdated] = useState(false)
  const [isFocused, setIsFocused] = useState(true)

  const [askedForDropDownData, setAskedForDropDownData] = useState(false)

  const theme = useTheme()
  const {
    fieldBackgroundColor,
    fieldBorderColor,
    fieldHoverBorderColor,
    fieldTextColor,
    labelTextColor,
    borderRadius,
  } = useProductColors()

  const { errorState } = useError()
  const { fieldState } = useIsFieldNotEmpty()

  const failedValidation = errorState[questionCode]
  const fieldNotEmpty = fieldState[questionCode]
  const { hasFieldMessage, fieldMessage } = useGetFieldMessage(parentCode, questionCode)

  const handleClearFieldMessage = useClearFieldMessage(parentCode, attributeCode, questionCode)

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
      // If the backend returns no data, it would just loop constantly, hence this check here
      if (!askedForDropDownData) {
        ddEvent('')
        setAskedForDropDownData(true)
      }
    }
    if (!updated) {
      setValue(getValue(data, options))
    }
    // I found that adding options on its own to this array just caused infinite re-renders

    // eslint-disable-next-line react-hooks/exhaustive-deps
  }, [data, options?.length])

  useEffect(() => {
    handleClearFieldMessage()
    // eslint-disable-next-line react-hooks/exhaustive-deps
  }, [])

  useEffect(() => {
    value?.length ? setIsFocused(true) : setIsFocused(false)
  }, [value])

  const onChange = newValue => {
    handleClearFieldMessage()
    if (!isMulti) {
      if (equals([newValue])(value) && !mandatory) {
        newValue = []
      } else {
        newValue = [newValue]
      }
    }
    setValue(newValue)
    setUpdated(true)
    newValue ? setIsFocused(true) : setIsFocused(false)
    onSendAnswer(prepareValueForSendingAnswer(newValue))
  }

  // the backend accepts array only when sending dropdown values regardless of multi or single select
  const prepareValueForSendingAnswer = value =>
    value && Array.isArray(value) && value.map(i => i.value)

  return (
    <Box position={'relative'} mt={isFocused ? 6 : 0} transition="all 0.25s ease">
      <HStack
        position={'absolute'}
        zIndex={theme.zIndices.docked}
        top={isFocused ? '-1.5rem' : 3}
        left={0}
        paddingStart={6}
        w="full"
        justifyContent={'space-between'}
        pointerEvents={'none'}
        transition="all 0.25s ease"
      >
        {placeholderName && (
          <Text as="label" fontSize={'sm'} fontWeight={'medium'} color={labelTextColor}>
            {placeholderName}
            {mandatory ? (
              <Text as="span" color={'red.500'} ml={1}>
                *
              </Text>
            ) : (
              <></>
            )}
          </Text>
        )}

        {(!failedValidation && fieldNotEmpty) ||
        (!failedValidation &&
          data?.value &&
          isNotStringifiedEmptyArray(value) &&
          value.length > 0) ? (
          <FontAwesomeIcon opacity="0.5" color="green" icon={faCheckCircle} />
        ) : null}
      </HStack>

      <CSelect
        useBasicStyles
        isMulti={isMulti}
        options={options}
        onChange={onChange}
        onInputChange={value => ddEvent(value)}
        onFocus={() => {
          setIsFocused(true)
          ddEvent('')
        }}
        test-id={questionCode}
        id={questionCode}
        value={value}
        classNamePrefix={clientId + '_dd'}
        selectedOptionStyle="check"
        placeholder=""
        chakraStyles={{
          container: provided => ({
            ...provided,
            w: 'full',
            // minW: `${placeholderName.length + 10}ch`,
          }),
          control: provided => ({
            ...provided,
            paddingInline: '0.5rem',
            paddingBlock: '0.5rem',
            bg: fieldBackgroundColor,
            borderRadius: borderRadius,
            borderColor: fieldBorderColor,
            fontSize: '0.875rem',
            fontWeight: '500',
            color: fieldTextColor,
            cursor: 'pointer',
            _hover: {
              borderColor: fieldHoverBorderColor,
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
            color: fieldTextColor,
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
      <ErrorDisplay fieldMessage={fieldMessage} hasFieldMessage={hasFieldMessage} />
    </Box>
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
