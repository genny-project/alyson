import Select from '../select'
import { selectCode } from 'redux/db/selectors'
import { useSelector } from 'react-redux'
import { useRef, useState, useEffect } from 'react'
import { Box, VStack, HStack, Button, Input, Text as ChakraText, useTheme } from '@chakra-ui/react'
import { onSendMessage } from 'vertx'
import debounce from 'lodash.debounce'
import { isEmpty, equals } from 'ramda'
import mapOptions from '../select/map-options'
import useProductColors from 'utils/productColors'
import { getValueSearchableText } from './get-value-searchable-text'
import { FontAwesomeIcon } from '@fortawesome/react-fontawesome'
import { faCheck } from '@fortawesome/free-solid-svg-icons'

export const Write = ({
  questionCode,
  data,
  onSendAnswer,
  errorMessage,
  parentCode,
  placeholderName,
  mandatory,
  targetCode,
  attributeCode,
}) => {
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
  const theme = useTheme()

  const [updated, setUpdated] = useState(false)
  const { selectedValue, value } = getValueSearchableText(data?.value || '')

  const [userInput, setUserInput] = useState(value)
  const [selectedOption, setSelectedOption] = useState(selectedValue)

  const [askedForDropDownData, setAskedForDropDownData] = useState(false)

  const {
    fieldBackgroundColor,
    fieldBorderColor,
    fieldHoverBorderColor,
    fieldTextColor,
    labelTextColor,
    borderRadius,
  } = useProductColors()

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
    console.log(option)
    setSelectedOption(option.value)
    setUserInput(null)
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
        position={'absolute'}
        zIndex={theme.zIndices.docked}
        top={isFocused || (userInput ?? '').length > 0 ? '-1.5rem' : 3}
        left={0}
        paddingStart={6}
        w="full"
        justifyContent={'space-between'}
        pointerEvents={'none'}
        transition="all 0.25s ease"
      >
        {placeholderName && (
          <ChakraText as="label" fontSize={'sm'} fontWeight={'medium'} color={labelTextColor}>
            {placeholderName}
            {mandatory ? (
              <ChakraText as="span" color={'red.500'} ml={1}>
                *
              </ChakraText>
            ) : (
              <></>
            )}
          </ChakraText>
        )}
      </HStack>
      <Input
        ref={inputRef}
        test-id={questionCode}
        id={questionCode}
        w={'full'}
        h={'auto'}
        onFocus={() => {
          ddEvent('')
          setIsFocused(true)
        }}
        onBlur={onBlur}
        paddingBlock={3}
        paddingInline={6}
        onChange={onInputChange}
        value={userInput || ''}
        bg={fieldBackgroundColor}
        borderRadius={borderRadius}
        borderColor={fieldBorderColor}
        fontSize={'sm'}
        fontWeight={'medium'}
        autoComplete={'off'}
        color={fieldTextColor}
        cursor={'pointer'}
        _hover={{
          borderColor: fieldHoverBorderColor,
          boxShadow: 'lg',
        }}
        _focusVisible={{
          borderColor: 'product.secondary',
          boxShadow: 'initial',
        }}
        _invalid={{
          background: 'error.50',
          borderColor: 'error.500',
          color: 'error.500',
        }}
        _disabled={{
          borderColor: 'gray.300',
          background: 'gray.100',
        }}
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
                  {`Search for: ${userInput}`}
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
