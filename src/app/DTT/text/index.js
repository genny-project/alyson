import { Box, Text as ChakraText, HStack, Input, VStack, useTheme } from '@chakra-ui/react'
import { compose, equals } from 'ramda'
import { faCalendar, faCheckCircle } from '@fortawesome/free-solid-svg-icons'
import { useDispatch, useSelector } from 'react-redux'
import { useEffect, useRef, useState } from 'react'

import { ACTIONS } from 'utils/contexts/ErrorReducer'
import DetailViewTags from 'app/DTT/text/detailview_tags'
import { FontAwesomeIcon } from '@fortawesome/react-fontawesome'
import debounce from 'lodash.debounce'
import dispatchBaseEntityUpdates from 'utils/helpers/dispatch-baseentity-updates'
import { getIsInvalid } from 'utils/functions'
import { isNotNullOrUndefinedOrEmpty } from 'utils/helpers/is-null-or-undefined.js'
import { isNotStringifiedEmptyArray } from 'utils/functionals'
import { lojing } from 'utils/constants'
import { newMsg } from 'redux/app'
import { selectFieldMessage } from 'redux/app/selectors'
import { useError } from 'utils/contexts/ErrorContext'
import { useIsFieldNotEmpty } from 'utils/contexts/IsFieldNotEmptyContext'

export const Write = ({
  questionCode,
  data,
  onSendAnswer,
  regexPattern,
  errorMessage,
  parentCode,
  placeholderName,
  attributeCode,
  targetCode,
  mandatory,
  clientId,
}) => {
  let regex
  const theme = useTheme()
  const { dispatch } = useError()
  const { dispatchFieldMessage } = useIsFieldNotEmpty()
  const [errorStatus, setErrorStatus] = useState(false)
  const [userInput, setuserInput] = useState(data?.value)
  const [isFocused, setIsFocused] = useState(false)

  const fieldMessageObject = useSelector(selectFieldMessage)
  const fieldMessage = fieldMessageObject[`${parentCode}@${questionCode}`]
  let hasFieldMessage = isNotNullOrUndefinedOrEmpty(fieldMessage)
  let hasErrorMessage = isNotNullOrUndefinedOrEmpty(errorMessage)
  const { errorState } = useError()
  const { fieldState } = useIsFieldNotEmpty()

  const failedValidation = errorState[questionCode]
  const fieldNotEmpty = fieldState[questionCode]
  const dispatchBeInformation = useDispatch()
  const onNewMsg = compose(dispatchBeInformation, newMsg)

  const fieldBackgroundColor = equals(clientId)(lojing)
    ? 'product.gray'
    : theme.colors.background.light
  const fieldBorderColor = equals(clientId)(lojing) ? 'product.gray' : theme.colors.gray['600']
  const fieldHoverBorderColor = equals(clientId)(lojing) ? 'product.gray' : 'product.secondary'
  const fieldTextColor = 'product.gray700'

  const labelTextColor = equals(clientId)(lojing) ? 'gray.600' : 'product.gray700'
  const borderRadius = equals(clientId)(lojing) ? 'calc(0.25rem - 1px)' : '0.5rem'

  try {
    regexPattern = regexPattern.replaceAll('\\\\', '\\')
    regex = RegExp(regexPattern)
  } catch (err) {
    console.error('There is an error with the regex', questionCode, err)
    regex = undefined
  }

  const inputRef = useRef()
  const isInvalid = getIsInvalid(userInput)(regex)

  useEffect(() => {
    data?.value ? setIsFocused(true) : setIsFocused(false)
    // eslint-disable-next-line react-hooks/exhaustive-deps
  }, [])

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

  const debouncedSendAnswer = debounce(onSendAnswer, 500)

  const onBlur = e => {
    e.target.value ? setIsFocused(true) : setIsFocused(false)
    !errorStatus && debouncedSendAnswer(e.target.value)
    dispatchFieldMessage({ payload: questionCode })
    dispatchBaseEntityUpdates(attributeCode, targetCode, userInput)(onNewMsg)
  }

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
        {(!failedValidation && fieldNotEmpty) ||
        (!failedValidation && userInput && isNotStringifiedEmptyArray(userInput)) ? (
          <FontAwesomeIcon opacity="0.5" color="green" icon={faCheckCircle} />
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
        onChange={e => setuserInput(e.target.value)}
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
