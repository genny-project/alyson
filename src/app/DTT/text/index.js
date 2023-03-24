import {
  Box,
  HStack,
  Input,
  InputGroup,
  InputLeftAddon,
  Text as ChakraText,
} from '@chakra-ui/react'
import { faCalendar, faCheckCircle } from '@fortawesome/free-solid-svg-icons'
import { useEffect, useRef, useState } from 'react'
import { ACKMESSAGEKEY, maxNumberOfRetries } from 'utils/constants'

import { faQuestionCircle } from '@fortawesome/free-solid-svg-icons'
import { FontAwesomeIcon } from '@fortawesome/react-fontawesome'
import { useGetAttributeFromProjectBaseEntity } from 'app/BE/project-be'
import useClearFieldMessage from 'app/DTT/helpers/clear-field-message'
import ErrorDisplay from 'app/DTT/helpers/error-display'
import DetailViewTags from 'app/DTT/text/detailview_tags'
import AnswerAcknowledge from 'app/layouts/components/form/answer_acknowledge'
import MandatorySymbol from 'app/layouts/components/form/mandatory-symbol'
import debounce from 'lodash.debounce'
import { equals } from 'ramda'
import { useSelector } from 'react-redux'
import { selectCode } from 'redux/db/selectors'
import { useError } from 'utils/contexts/ErrorContext'
import { ACTIONS } from 'utils/contexts/ErrorReducer'
import { useIsFieldNotEmpty } from 'utils/contexts/IsFieldNotEmptyContext'
import useGetFieldMessage from 'utils/fieldMessage'
import { getIsInvalid } from 'utils/functions'
import { useIsProductInternmatch } from 'utils/helpers/check-product-name'
import useGetProductName from 'utils/helpers/get-product-name'
import { isNotNullOrUndefinedOrEmpty } from 'utils/helpers/is-null-or-undefined'
import useProductColors from 'utils/productColors'
import useStyles from '../inputStyles'

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
  icon,
}) => {
  let regex
  const productName = useGetProductName()
  const realm = productName.toLowerCase()
  const isProductInternMatch = useIsProductInternmatch()

  const [errorStatus, setErrorStatus] = useState(false)
  const [userInput, setuserInput] = useState(data?.value || '')
  const [isFocused, setIsFocused] = useState(false)
  const inputRef = useRef()
  const labelRef = useRef()
  const retrySendingAnswerRef = useRef(0)
  const iconColor = useGetAttributeFromProjectBaseEntity('PRI_COLOR_SECONDARY')?.valueString

  const { dispatch } = useError()
  const { dispatchFieldMessage } = useIsFieldNotEmpty()
  const { errorState } = useError()
  const { hasFieldMessage, fieldMessage } = useGetFieldMessage(parentCode, questionCode)
  let hasErrorMessage = isNotNullOrUndefinedOrEmpty(errorMessage)

  const { labelTextColor } = useProductColors()

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

  const hasValidData = userInput && !isInvalid
  const { inputStyles, labelStyles, inputGroupStyles } = useStyles(
    hasValidData,
    isFocused,
    isInvalid,
    labelRef,
  )

  return (
    <Box position={'relative'} mt={isFocused ? 6 : 0} transition="all 0.25s ease">
      <HStack
        ref={labelRef}
        paddingStart={isFocused ? 6 : !!icon ? 12 : 6}
        {...labelStyles}
        top={isFocused ? `calc(-${labelRef?.current?.clientHeight}px + .5rem)` : 0}
        h={'full'}
      >
        <MandatorySymbol
          placeholderName={placeholderName}
          mandatory={mandatory}
          labelTextColor={isProductInternMatch ? `${realm}.primary` : labelTextColor}
          realm={realm}
        />
        <AnswerAcknowledge
          failedValidation={failedValidation}
          userInput={userInput}
          retrySendingAnswerRef={retrySendingAnswerRef}
          questionCode={questionCode}
        />
      </HStack>
      {!!icon ? (
        <InputGroup onClick={() => setIsFocused(true)} role="group" {...inputGroupStyles}>
          <InputLeftAddon
            h={'auto'}
            border={0}
            borderRadius={0}
            paddingInlineStart={4}
            bg={'transparent'}
            color={isFocused ? iconColor : isProductInternMatch ? `${realm}.primary` : 'gray.600'}
            _groupHover={{
              bg: 'transparent',
              color: isProductInternMatch ? `${realm}.primary` : iconColor,
            }}
            _groupfocusvisible={{
              color: isProductInternMatch ? `${realm}.primary` : iconColor,
            }}
            _groupfocuswithin={{
              color: isProductInternMatch ? `${realm}.primary` : iconColor,
            }}
          >
            <FontAwesomeIcon size="lg" icon={icon || faQuestionCircle} color={'inherit'} />
          </InputLeftAddon>

          <Input
            isInvalid={isInvalid}
            test-id={questionCode}
            id={questionCode}
            ref={inputRef}
            onBlur={onBlur}
            onChange={e => setuserInput(e.target.value)}
            value={userInput || ''}
            paddingBlock={3}
            paddingInlineEnd={6}
            paddingInlineStart={!!icon ? 1 : 6}
            h={'auto'}
            border={0}
            fontWeight={isProductInternMatch ? `normal` : 'medium'}
            fontSize={'sm'}
            _focus={{ border: 0 }}
            _invalid={{
              background: 'transparent',
              borderColor: 'transparent',
            }}
          />
        </InputGroup>
      ) : (
        <Input
          isInvalid={isInvalid}
          test-id={questionCode}
          id={questionCode}
          ref={inputRef}
          onClick={() => setIsFocused(true)}
          onBlur={onBlur}
          onChange={e => setuserInput(e.target.value)}
          value={userInput || ''}
          paddingBlock={3}
          paddingInlineEnd={6}
          paddingInlineStart={!!icon ? 1 : 6}
          {...inputStyles}
        />
      )}
      <ErrorDisplay
        hasErrorMessage={hasErrorMessage}
        errorStatus={errorStatus}
        errorMessage={errorMessage}
        fieldMessage={fieldMessage}
        hasFieldMessage={hasFieldMessage}
        realm={realm}
        isProductIM={isProductInternMatch}
      />
    </Box>
  )
}

export const Read = ({ data, config = {}, hasIndicatorIcon, parentCode }) => {
  const { detailViewTags } = config
  const isSubmitFormField = equals(parentCode, 'QUE_SUBMIT_APPLICATION')

  console.log(isSubmitFormField)

  const submitFormFieldStyles = {
    bg: 'white',
    w: 'full',
    paddingBlock: 3,
    paddingInline: 6,
    fontWeight: 400,
    fontSize: 'sm',
    height: 'auto',
    borderRadius: 'calc(0.25rem - 1px)',
    margin: '.5rem 0 1rem  !important',
  }

  const styles = isSubmitFormField ? submitFormFieldStyles : {}

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

  return (
    <ChakraText {...styles} {...config}>
      {data?.value || config.defaultValue}
    </ChakraText>
  )
}

const Text = {
  Write,
  Read,
}

export default Text
