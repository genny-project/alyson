import { Box, Text as ChakraText, HStack, Input, VStack, useTheme } from '@chakra-ui/react'
import { faCalendar, faCheckCircle, faTimesCircle } from '@fortawesome/free-solid-svg-icons'
import { useEffect, useRef, useState } from 'react'
import { useSelector } from 'react-redux'

import { ACTIONS } from 'utils/contexts/ErrorReducer'
import DetailViewTags from 'app/DTT/text/detailview_tags'
import { FontAwesomeIcon } from '@fortawesome/react-fontawesome'
import debounce from 'lodash.debounce'
import { getIsInvalid } from 'utils/functions'
import { isNotNullOrUndefinedOrEmpty } from 'utils/helpers/is-null-or-undefined'
import { isNotStringifiedEmptyArray } from 'utils/functionals'
import { useError } from 'utils/contexts/ErrorContext'
import useGetFieldMessage from 'utils/fieldMessage'
import { useIsFieldNotEmpty } from 'utils/contexts/IsFieldNotEmptyContext'
import useProductColors from 'utils/productColors'
import { selectCode } from 'redux/db/selectors'
import { ACKMESSAGEKEY } from 'utils/constants'
import { maxNumberOfRetries } from 'utils/constants'

export const Write = ({
  questionCode,
  data,
  onSendAnswer,
  regexPattern,
  errorMessage,
  parentCode,
  placeholderName,
  mandatory,
  inputmask,
}) => {
  let regex
  const [errorStatus, setErrorStatus] = useState(false)
  const [userInput, setuserInput] = useState(data?.value || '')
  const [isFocused, setIsFocused] = useState(false)
  const inputRef = useRef()
  const retrySendingAnswerRef = useRef(0)

  const theme = useTheme()
  const { dispatch } = useError()
  const { dispatchFieldMessage } = useIsFieldNotEmpty()
  const { errorState } = useError()
  const { hasFieldMessage, fieldMessage } = useGetFieldMessage(parentCode, questionCode)
  const {
    fieldBackgroundColor,
    fieldBorderColor,
    fieldHoverBorderColor,
    fieldTextColor,
    labelTextColor,
    borderRadius,
  } = useProductColors()

  let hasErrorMessage = isNotNullOrUndefinedOrEmpty(errorMessage)
  const failedValidation = errorState[questionCode]
  const isInvalid = getIsInvalid(userInput)(regex)
  const debouncedSendAnswer = debounce(onSendAnswer, 500)
  const ackMessageObject = useSelector(selectCode(ACKMESSAGEKEY))
  const ackMessageValue = ackMessageObject?.[questionCode] || ''

  const onBlur = e => {
    e.target.value ? setIsFocused(true) : setIsFocused(false)
    !errorStatus && debouncedSendAnswer(userInput)
    dispatchFieldMessage({ payload: questionCode })
  }

  const inputmaskFilter = value => inputmask => {
    // check if inputmask only contains digits
    let filteredValue = ''
    if (value && inputmask && /^\d+$/.test(inputmask)) {
      // allow a leading '+' to phone number, otherwise break validations
      if (value.length > 0 && /^\+/.test(value)) {
        filteredValue = '+' + value.substring(1).replace(/\D/g, '')
      } else {
        filteredValue = value.replace(/\D/g, '')
      }
    }
    return filteredValue ? filteredValue.substring(0, inputmask.length) : value
  }

  try {
    regexPattern = regexPattern.replaceAll('\\\\', '\\')
    regex = RegExp(regexPattern)
  } catch (err) {
    console.error('There is an error with the regex', questionCode, err)
    regex = undefined
  }

  useEffect(() => {
    userInput ? setIsFocused(true) : setIsFocused(false)
  }, [userInput])

  useEffect(() => {
    setuserInput(data?.value)
  }, [data, setuserInput])

  useEffect(() => {
    const listener = event => {
      if (event.code === 'Enter' && !event.shiftKey) {
        event.preventDefault()
        inputRef.current.blur()
      }
    }
    document.addEventListener('keydown', listener)
    return () => {
      document.removeEventListener('keydown', listener)
    }
  }, [])

  useEffect(() => {
    isInvalid ? setErrorStatus(true) : setErrorStatus(false)
  }, [isInvalid, setErrorStatus])

  useEffect(() => {
    isInvalid
      ? dispatch({ type: ACTIONS.SET_TO_TRUE, payload: questionCode })
      : dispatch({ type: ACTIONS.SET_TO_FALSE, payload: questionCode })
  }, [dispatch, isInvalid, questionCode])

  useEffect(() => {
    const timer = setInterval(() => {
      if (retrySendingAnswerRef.current < maxNumberOfRetries) {
        !errorStatus && debouncedSendAnswer(userInput)
        retrySendingAnswerRef.current = retrySendingAnswerRef.current + 1
      }
    }, 5000)
    return () => clearInterval(timer)
  }, [ackMessageValue, debouncedSendAnswer, errorStatus, userInput])

  useEffect(() => {
    retrySendingAnswerRef.current = 0
  }, [userInput])

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
        {!failedValidation && userInput && isNotStringifiedEmptyArray(userInput) ? (
          !!ackMessageValue ? (
            <FontAwesomeIcon opacity="0.5" color="green" icon={faCheckCircle} />
          ) : retrySendingAnswerRef.current < maxNumberOfRetries ? (
            <FontAwesomeIcon opacity="0.5" color="orange" icon={faCheckCircle} />
          ) : (
            <FontAwesomeIcon opacity="0.5" color="red" icon={faTimesCircle} />
          )
        ) : null}
      </HStack>

      <Input
        test-id={questionCode}
        id={questionCode}
        ref={inputRef}
        onFocus={() => {
          setIsFocused(true)
        }}
        onBlur={onBlur}
        onChange={e => setuserInput(inputmaskFilter(e.target.value)(inputmask))}
        value={userInput || ''}
        isInvalid={isInvalid}
        w="full"
        h={'auto'}
        paddingBlock={3}
        paddingInline={6}
        bg={fieldBackgroundColor}
        borderRadius={borderRadius}
        borderColor={fieldBorderColor}
        fontSize={'sm'}
        fontWeight={'medium'}
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

      {errorStatus && (
        <VStack alignItems="start">
          {(hasFieldMessage || hasErrorMessage) && (
            <ChakraText textStyle="product.errorText">
              {hasFieldMessage ? fieldMessage : errorMessage}
            </ChakraText>
          )}
        </VStack>
      )}
    </Box>
  )
}

export const Read = ({ data, config = {}, hasIndicatorIcon }) => {
  const { detailViewTags } = config

  if (detailViewTags) {
    return <DetailViewTags data={data} />
  }

  if (hasIndicatorIcon) {
    return data?.value === 'UNFINISHED' ? (
      <FontAwesomeIcon icon={faCalendar} color={'#C0C0C0'} />
    ) : (
      <FontAwesomeIcon icon={faCheckCircle} color={'#006400'} />
    )
  }

  return <ChakraText {...config}>{data?.value || config.defaultValue}</ChakraText>
}

const Text = {
  Write,
  Read,
}

export default Text
