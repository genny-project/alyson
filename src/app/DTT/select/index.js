import './styles.css'

import { Box, HStack, Text, VStack, useTheme } from '@chakra-ui/react'
import { compose, includes, isEmpty, pathOr } from 'ramda'
import { selectCode, selectRows } from 'redux/db/selectors'
import { useDispatch, useSelector } from 'react-redux'
import { useEffect, useState } from 'react'

import { Select as CSelect } from 'chakra-react-select'
import { FontAwesomeIcon } from '@fortawesome/react-fontawesome'
import debounce from 'lodash.debounce'
import dispatchBaseEntityUpdates from 'utils/helpers/dispatch-baseentity-updates'
import { faCheckCircle } from '@fortawesome/free-solid-svg-icons'
import { getValue } from './get-value'
import { isNotStringifiedEmptyArray } from 'utils/functionals'
import mapOptions from './map-options'
import { newMsg } from 'redux/app'
import { onSendMessage } from 'vertx'
import { useError } from 'utils/contexts/ErrorContext'
import { useIsFieldNotEmpty } from 'utils/contexts/IsFieldNotEmptyContext'
import useProductColors from 'utils/productColors'
import { selectFieldMessage } from 'redux/app/selectors'
import { isNotNullOrUndefinedOrEmpty } from 'utils/helpers/is-null-or-undefined'

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
  const dispatchBeInformation = useDispatch()
  const onNewMsg = compose(dispatchBeInformation, newMsg)

  const fieldMessageObject = useSelector(selectFieldMessage)
  const fieldMessage = fieldMessageObject[`${parentCode}@${questionCode}`]
  let hasFieldMessage = isNotNullOrUndefinedOrEmpty(fieldMessage)

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
    if (!updated) {
      setValue(getValue(data, options))
    }
    // I found that adding options on its own to this array just caused infinite re-renders

    // eslint-disable-next-line react-hooks/exhaustive-deps
  }, [data, options?.length])

  useEffect(() => {
    value?.length ? setIsFocused(true) : setIsFocused(false)
  }, [value])

  const onChange = newValue => {
    if (!isMulti) {
      newValue = [newValue]
    }
    setValue(newValue)
    setUpdated(true)
    newValue ? setIsFocused(true) : setIsFocused(false)
    onSendAnswer(prepareValueForSendingAnswer(newValue))
    dispatchBaseEntityUpdates(attributeCode, targetCode, newValue)(onNewMsg)
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
        (!failedValidation && data?.value && isNotStringifiedEmptyArray(value)) ? (
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
      {hasFieldMessage && (
        <VStack alignItems="start">
          <Text textStyle="product.errorText">{fieldMessage}</Text>)
        </VStack>
      )}
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
