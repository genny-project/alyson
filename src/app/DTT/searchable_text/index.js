import { Box, Button, HStack, Input, VStack } from '@chakra-ui/react'
import { empty, equals, isEmpty, not } from 'ramda'
import { useEffect, useRef, useState } from 'react'

import { faCheck } from '@fortawesome/free-solid-svg-icons'
import { FontAwesomeIcon } from '@fortawesome/react-fontawesome'
import useStyles from 'app/DTT/inputStyles'
import MandatorySymbol from 'app/layouts/components/form/mandatory-symbol'
import debounce from 'lodash.debounce'
import { useSelector } from 'react-redux'
import { selectCode } from 'redux/db/selectors'
import { useIsProductInternmatch } from 'utils/helpers/check-product-name'
import useGetProductName from 'utils/helpers/get-product-name'
import useProductColors from 'utils/productColors'
import { onSendMessage } from 'vertx'
import Select from '../select'
import mapOptions from '../select/map-options'
import { getValueSearchableText } from './get-value-searchable-text'

export const Write = ({
  questionCode,
  data,
  onSendAnswer,
  parentCode,
  placeholderName,
  mandatory,
  targetCode,
  attributeCode,
  config = {},
}) => {
  const labelRef = useRef()
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

  const processId = useSelector(selectCode(questionCode, 'processId'))
  const sourceCode = useSelector(selectCode('USER'))

  const [isFocused, setIsFocused] = useState(false)
  const [mouseEntered, setMouseEntered] = useState(false)

  const [updated, setUpdated] = useState(false)
  const { selectedValue, value } = getValueSearchableText(data?.value || '')

  const [userInput, setUserInput] = useState(value)
  const [selectedOption, setSelectedOption] = useState(selectedValue)

  const [askedForDropDownData, setAskedForDropDownData] = useState(false)

  const hasValidData = not(empty(userInput))
  const { inputStyles, labelStyles } = useStyles(hasValidData, isFocused)

  const { fieldTextColor, labelTextColor } = useProductColors()

  const inputRef = useRef()

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

  const onSelect = option => {
    setSelectedOption(option.value)
    setUserInput(option.label)
    onChange(null)(option.value)
  }

  const onInputChange = e => {
    setUpdated(true)
    setUserInput(e.target.value)
    ddEvent(e.target.value || '')
    setSelectedOption(null)
  }

  const onChange = value => option => {
    const optionSelected = !!option
    onSendAnswer({ value: optionSelected ? option : value, isCode: optionSelected })

    setUpdated(true)
    inputRef.current.blur()
  }

  const onBlur = () => {
    setIsFocused(false)
  }

  useEffect(() => {
    const mouseDownListener = event => {
      if (event.button === 0) {
        if (isFocused && mouseEntered) {
          event.preventDefault()
        }
      }
    }
    const keyDownListener = event => {
      if (event.code === 'Enter' && !event.shiftKey && equals(event.target.id)(questionCode)) {
        event.preventDefault()
        onChange(event.target.value)()
      }
    }
    document.addEventListener('keydown', keyDownListener)
    document.addEventListener('mousedown', mouseDownListener)
    return () => {
      document.removeEventListener('mousedown', mouseDownListener)
      document.removeEventListener('keydown', keyDownListener)
    }
    // eslint-disable-next-line react-hooks/exhaustive-deps
  }, [isFocused, mouseEntered])

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
      const { selectedValue, value } = getValueSearchableText(data?.value || '')
      setUserInput(value)
      setSelectedOption(selectedValue)
    }
    // I found that adding options on its own to this array just caused infinite re-renders

    // eslint-disable-next-line react-hooks/exhaustive-deps
  }, [data, options?.length])

  return (
    <Box
      position={'relative'}
      w={'auto'}
      mt={isFocused || (userInput ?? '').length > 0 ? 6 : 0}
      transition="all 0.25s ease"
    >
      <HStack
        ref={labelRef}
        paddingStart={6}
        top={isFocused || (userInput ?? '').length > 0 ? '-1.5rem' : 3}
        {...labelStyles}
        h={isFocused ? labelRef?.current?.clientHeight : 'full'}
      >
        {placeholderName && (
          <MandatorySymbol
            placeholderName={placeholderName}
            labelTextColor={isProductInternMatch ? `${realm}.primary` : labelTextColor}
            realm={realm}
            mandatory={mandatory}
          />
        )}
      </HStack>
      <Input
        ref={inputRef}
        test-id={questionCode}
        id={questionCode}
        onFocus={() => {
          ddEvent('')
          setIsFocused(true)
        }}
        onBlur={onBlur}
        autoComplete={'off'}
        paddingBlock={3}
        paddingInline={6}
        onChange={onInputChange}
        value={userInput || ''}
        {...inputStyles}
      />
      {isFocused && (
        <div
          onMouseEnter={() => setMouseEntered(true)}
          onMouseLeave={() => setMouseEntered(false)}
          style={{
            zIndex: 40,
            position: 'absolute',
            top: 'auto',
            left: 0,
            width: '100%',
            transition: 'all 0.25s ease',
          }}
        >
          <Box width="100%" shadow="lg" bg="#fff" fontSize={'0.875rem'} fontWeight={500}>
            <VStack>
              {(userInput || '').length > 0 && !selectedOption ? (
                <Button
                  onClick={() => onChange(userInput)()}
                  w="100%"
                  sx={{
                    justifyContent: 'space-between',
                    textAlign: 'left',
                    paddingInlineStart: 10,
                    paddingInlineEnd: 3,
                    paddingBlock: 2,
                    borderRadius: '1.25rem',
                    bg: '#fff',
                    fontSize: '0.875rem',
                    fontWeight: '800',
                    color: fieldTextColor,
                    _hover: {
                      bg: 'product.secondary',
                      color: '#fff',
                    },
                  }}
                  rightIcon={<div>⏎</div>}
                  key={`${questionCode}-typed-input`}
                >
                  {`${config?.searchPrefix || 'Search for'}: ${userInput}`}
                </Button>
              ) : null}
              {options.map(option => {
                return (
                  <Button
                    onClick={() => onSelect(option)}
                    w="100%"
                    rightIcon={
                      equals(option.value)(selectedOption) ? (
                        <FontAwesomeIcon icon={faCheck} />
                      ) : null
                    }
                    sx={{
                      justifyContent: 'space-between',
                      textAlign: 'left',
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
                    }}
                    key={`${questionCode}-${option.value}`}
                  >
                    {option.label}
                  </Button>
                )
              })}
            </VStack>
          </Box>
        </div>
      )}
    </Box>
  )
}

const Read = ({ data, dataType }) => {
  return <Select.Read data={data} dataType={dataType} />
}

const SearchableText = {
  Write,
  Read,
}

export default SearchableText
