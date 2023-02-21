import './styles.css'

import { Box, HStack, Text, useTheme } from '@chakra-ui/react'
import { equals, includes, isEmpty, or, pathOr } from 'ramda'
import { useSelector } from 'react-redux'
import { useEffect, useState } from 'react'
import { selectCode, selectRows } from 'redux/db/selectors'

import { faCheckCircle } from '@fortawesome/free-solid-svg-icons'
import { FontAwesomeIcon } from '@fortawesome/react-fontawesome'
import useClearFieldMessage from 'app/DTT/helpers/clear-field-message'
import ErrorDisplay from 'app/DTT/helpers/error-display'
import MandatorySymbol from 'app/layouts/components/form/mandatory-symbol'
import { Select as CSelect } from 'chakra-react-select'
import debounce from 'lodash.debounce'
import { useError } from 'utils/contexts/ErrorContext'
import { useIsFieldNotEmpty } from 'utils/contexts/IsFieldNotEmptyContext'
import useGetFieldMessage from 'utils/fieldMessage'
import { isNotStringifiedEmptyArray } from 'utils/functionals'
import { useIsProductInternmatch } from 'utils/helpers/check-product-name'
import useGetProductName from 'utils/helpers/get-product-name'
import useProductColors from 'utils/productColors'
import { onSendMessage } from 'vertx'
import { getValue } from './get-value'
import mapOptions from './map-options'

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
  const realm = useGetProductName().toLowerCase()
  const isProductInternMatch = useIsProductInternmatch()

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
  const [inputValue, setInputValue] = useState('')
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
    // Clear out the field if the dropdown is cleared
    if (!data?.value) {
      setValue([])
    }
    // I found that adding options on its own to this array just caused infinite re-renders

    // eslint-disable-next-line react-hooks/exhaustive-deps
  }, [data, options?.length])

  useEffect(() => {
    handleClearFieldMessage()
    // eslint-disable-next-line react-hooks/exhaustive-deps
  }, [])

  useEffect(() => {
    or(!isEmpty(inputValue), !isEmpty(value)) ? setIsFocused(true) : setIsFocused(false)
  }, [value, inputValue])

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
          <MandatorySymbol
            placeholderName={placeholderName}
            labelTextColor={isProductInternMatch ? `${realm}.primary` : labelTextColor}
            realm={realm}
            mandatory={mandatory}
          />
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
        // menuIsOpen={false}
        useBasicStyles
        isMulti={isMulti}
        options={options}
        onChange={onChange}
        onInputChange={value => {
          setInputValue(value)
          ddEvent(value)
        }}
        onFocus={() => {
          setIsFocused(true)
          ddEvent('')
        }}
        onBlur={() => {
          if (isEmpty(value)) {
            setIsFocused(false)
          }
        }}
        test-id={questionCode}
        id={questionCode}
        value={value}
        inputValue={inputValue}
        classNamePrefix={realm + '_dd'}
        selectedOptionStyle="check"
        placeholder=""
        chakraStyles={{
          input: provided => ({
            ...provided,
            w: 'full',
          }),
          container: provided => ({
            ...provided,
            w: 'full',
            //Minimum width for the save search fields
            minW: 24,
          }),
          control: provided => ({
            ...provided,
            paddingInline: '0.5rem',
            paddingBlock: '0.5rem',
            bg:
              isProductInternMatch && value
                ? `${realm}.primary400`
                : isProductInternMatch
                ? `${realm}.secondary400`
                : fieldBackgroundColor,
            borderRadius: isProductInternMatch ? 'lg' : borderRadius,
            borderColor: isProductInternMatch ? `${realm}.primary` : fieldBorderColor,
            fontSize: '0.875rem',
            fontWeight: '500',
            color: isProductInternMatch ? `${realm}.primary` : fieldTextColor,
            cursor: 'pointer',
            _hover: {
              bg: isProductInternMatch ? `${realm}.primary400` : fieldBackgroundColor,
              borderColor: isProductInternMatch ? `${realm}.primary` : fieldHoverBorderColor,
              boxShadow: 'lg',
            },
            _focus: {
              bg: isProductInternMatch ? `${realm}.primary400` : fieldBackgroundColor,
              borderColor: isProductInternMatch ? `${realm}.primary` : 'product.secondary',
              boxShadow: 'inherit',
            },
            _valid: {
              bg: isProductInternMatch ? `${realm}.primary400` : fieldBackgroundColor,
              borderColor: isProductInternMatch ? `${realm}.primary` : fieldHoverBorderColor,
            },
            _invalid: {
              background: isProductInternMatch ? `${realm}.secondary400Alpha20` : 'error.50',
              borderColor: isProductInternMatch ? `${realm}.secondary` : 'error.500',
              color: isProductInternMatch ? `${realm}.secondary` : 'error.500',
            },
          }),
          menu: provided => ({
            ...provided,
            marginBlock: 0,
            paddingBlock: isProductInternMatch ? 0 : 3,
            border: 0,
            borderRadius: '0.25rem 0.25rem 1.25rem 1.25rem',
            boxShadow: '0px 4px 15px -2px rgba(0, 0, 0, 0.25)',
            zIndex: 100,
            bg: isProductInternMatch ? `${realm}.primary` : 'initial',
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
            borderRadius: isProductInternMatch ? 0 : '1.25rem',
            bg: isProductInternMatch ? `${realm}.primary` : '#fff',
            fontSize: '0.875rem',
            fontWeight: '500',
            color: isProductInternMatch ? `${realm}.light` : fieldTextColor,
            _hover: {
              bg: isProductInternMatch ? `${realm}.secondary` : 'product.secondary',
              color: isProductInternMatch ? `${realm}.dark` : '#fff',
            },
            _disabled: {
              color: isProductInternMatch ? `${realm}.primary400` : '#fff',
              opacity: '.55',
            },
          }),
          noOptionsMessage: provided => ({
            ...provided,
            fontSize: '0.875rem',
            fontWeight: '500',
            bg: isProductInternMatch ? `${realm}.primary` : '#fff',
            color: isProductInternMatch ? `${realm}.light` : fieldTextColor,
          }),
        }}
      />
      <ErrorDisplay
        fieldMessage={fieldMessage}
        hasFieldMessage={hasFieldMessage}
        realm={realm}
        isProductIM={isProductInternMatch}
      />
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
