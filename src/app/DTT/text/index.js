import { ACKMESSAGEKEY, maxNumberOfRetries } from 'utils/constants'
import {
  Box,
  Text as ChakraText,
  HStack,
  Input,
  useTheme,
  InputGroup,
  InputLeftAddon,
} from '@chakra-ui/react'
import { faCalendar, faCheckCircle } from '@fortawesome/free-solid-svg-icons'
import { useEffect, useRef, useState } from 'react'

import { ACTIONS } from 'utils/contexts/ErrorReducer'
import AnswerAcknowledge from 'app/layouts/components/form/answer_acknowledge'
import DetailViewTags from 'app/DTT/text/detailview_tags'
import { FontAwesomeIcon } from '@fortawesome/react-fontawesome'
import InputMask from 'react-input-mask'
import MandatorySymbol from 'app/layouts/components/form/mandatory-symbol'
import debounce from 'lodash.debounce'
import { getIsInvalid } from 'utils/functions'
import { isNotNullOrUndefinedOrEmpty } from 'utils/helpers/is-null-or-undefined'
import { selectCode } from 'redux/db/selectors'
import { useError } from 'utils/contexts/ErrorContext'
import useGetFieldMessage from 'utils/fieldMessage'
import { useIsFieldNotEmpty } from 'utils/contexts/IsFieldNotEmptyContext'
import useProductColors from 'utils/productColors'
import { useSelector } from 'react-redux'
import ErrorDisplay from 'app/DTT/helpers/error-display'
import useClearFieldMessage from 'app/DTT/helpers/clear-field-message'
import { useGetAttributeFromProjectBaseEntity } from 'app/BE/project-be'
import { faQuestionCircle } from '@fortawesome/free-solid-svg-icons'

export const Write = ({
  questionCode,
  data,
  onSendAnswer,
  regexPattern,
  errorMessage,
  parentCode,
  attributeCode,
  placeholderName,
  mandatory,
  inputmask,
  icon,
}) => {
  let regex
  const [errorStatus, setErrorStatus] = useState(false)
  const [userInput, setuserInput] = useState(data?.value || '')
  const [isFocused, setIsFocused] = useState(false)
  const inputRef = useRef()
  const retrySendingAnswerRef = useRef(0)
  const iconColor = useGetAttributeFromProjectBaseEntity('PRI_COLOR_SECONDARY')?.valueString

  const theme = useTheme()
  const { dispatch } = useError()
  const { dispatchFieldMessage } = useIsFieldNotEmpty()
  const { errorState } = useError()
  const { hasFieldMessage, fieldMessage } = useGetFieldMessage(parentCode, questionCode)
  let hasErrorMessage = isNotNullOrUndefinedOrEmpty(errorMessage)

  const {
    fieldBackgroundColor,
    fieldBorderColor,
    fieldHoverBorderColor,
    fieldTextColor,
    labelTextColor,
    borderRadius,
  } = useProductColors()

  try {
    regex = RegExp(regexPattern)
  } catch (err) {
    console.error('There is an error with the regex', questionCode, err)
    regex = undefined
  }
  const failedValidation = errorState[questionCode]
  const isInvalid = getIsInvalid(userInput)(regex)
  const debouncedSendAnswer = debounce(onSendAnswer, 500)
  const ackMessageObject = useSelector(selectCode(ACKMESSAGEKEY))
  const ackMessageValue = ackMessageObject?.[questionCode] || ''

  const handleClearFieldMessage = useClearFieldMessage(parentCode, attributeCode, questionCode)

  const onBlur = e => {
    e.target.value ? setIsFocused(true) : setIsFocused(false)
    !errorStatus && debouncedSendAnswer(userInput)
    dispatchFieldMessage({ payload: questionCode })
    hasFieldMessage && handleClearFieldMessage()
  }

  useEffect(() => {
    userInput ? setIsFocused(true) : setIsFocused(false)
  }, [userInput])

  useEffect(() => {
    setuserInput(data?.value)
  }, [data, setuserInput])

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
        !errorStatus && !ackMessageValue && userInput && debouncedSendAnswer(userInput)
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
        paddingStart={isFocused ? 6 : !!icon ? 12 : 6}
        w="full"
        justifyContent={'space-between'}
        pointerEvents={'none'}
        transition="all 0.25s ease"
      >
        <MandatorySymbol
          placeholderName={placeholderName}
          mandatory={mandatory}
          labelTextColor={labelTextColor}
        />
        <AnswerAcknowledge
          failedValidation={failedValidation}
          userInput={userInput}
          retrySendingAnswerRef={retrySendingAnswerRef}
          questionCode={questionCode}
        />
      </HStack>
      <InputGroup
        onClick={() => setIsFocused(true)}
        bg={fieldBackgroundColor}
        borderRadius={borderRadius}
        borderColor={fieldBorderColor}
        borderWidth="1px"
        borderStyle="solid"
        overflow={'hidden'}
        role="group"
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
      >
        {!!icon && (
          <InputLeftAddon
            h={'auto'}
            border={0}
            borderRadius={0}
            paddingInlineStart={4}
            color={isFocused ? iconColor : 'gray.600'}
            _groupHover={{
              color: iconColor,
            }}
            _groupfocusvisible={{
              color: iconColor,
            }}
            _groupfocuswithin={{
              color: iconColor,
            }}
          >
            <FontAwesomeIcon size="lg" icon={icon || faQuestionCircle} color={'inherit'} />
          </InputLeftAddon>
        )}
        <Input
          as={InputMask}
          mask={inputmask}
          maskChar={null}
          test-id={questionCode}
          id={questionCode}
          ref={inputRef}
          onBlur={onBlur}
          onChange={e => setuserInput(e.target.value)}
          value={userInput || ''}
          w="full"
          h={'auto'}
          paddingBlock={3}
          paddingInlineEnd={6}
          paddingInlineStart={!!icon ? 1 : 6}
          border={0}
          fontSize={'sm'}
          fontWeight={'medium'}
          color={fieldTextColor}
          _focusVisible={{
            border: '0',
          }}
          _focus={{
            border: '0',
          }}
          cursor={'pointer'}
        />
      </InputGroup>
      <ErrorDisplay
        hasErrorMessage={hasErrorMessage}
        errorStatus={errorStatus}
        errorMessage={errorMessage}
        fieldMessage={fieldMessage}
        hasFieldMessage={hasFieldMessage}
      />
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
