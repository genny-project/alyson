import {
  Box,
  Center,
  HStack,
  Input,
  InputGroup,
  InputLeftElement,
  Menu,
  MenuButton,
  MenuItem,
  MenuList,
} from '@chakra-ui/react'
import { useEffect, useRef, useState } from 'react'
import { ACKMESSAGEKEY, maxNumberOfRetries } from 'utils/constants'

import useClearFieldMessage from 'app/DTT/helpers/clear-field-message'
import ErrorDisplay from 'app/DTT/helpers/error-display'
import AnswerAcknowledge from 'app/layouts/components/form/answer_acknowledge'
import MandatorySymbol from 'app/layouts/components/form/mandatory-symbol'
import debounce from 'lodash.debounce'
import { map, range } from 'ramda'

import useStyles from 'app/DTT/inputStyles'
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

import { Iconly } from 'react-iconly'
import InputMask from 'react-input-mask'

import { Read } from 'app/DTT/text'

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
}) => {
  let regex
  const productName = useGetProductName()
  const realm = productName.toLowerCase()
  const isProductInternMatch = useIsProductInternmatch()

  const [errorStatus, setErrorStatus] = useState(false)
  const [userInput, setuserInput] = useState(data?.value || '')
  const [isFocused, setIsFocused] = useState(false)
  const inputRef = useRef()
  const menuRef = useRef()
  const labelRef = useRef()
  const retrySendingAnswerRef = useRef(0)

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
  const { inputStyles, labelStyles, maskFormatChars } = useStyles(
    hasValidData,
    isFocused,
    isInvalid,
    labelRef,
  )

  const ClockMenu = ({ increment = 30 }) => {
    const realm = useGetProductName().toLowerCase()
    const isProductInternmatch = useIsProductInternmatch()
    let hours = range(0, 24)
    let minutes = map(time => {
      return (time * increment) % 60
    })(range(0, 60 / increment))

    let times = []

    map(hour => {
      let hourStr = String(hour)
      hourStr = hourStr.padStart(2, '0')
      map(minute => {
        let minStr = String(minute)
        minStr = minStr.padEnd(2, '0')
        times.push(`${hourStr}:${minStr}`)
      })(minutes)
    })(hours)

    return (
      <Box zIndex={'dropdown'}>
        <InputLeftElement height={'3rem'}>
          <Menu isLazy={true} overflow="hidden" initialFocusRef={menuRef}>
            <MenuButton w="full">
              <Center>
                <Iconly name="TimeCircle" />
              </Center>
            </MenuButton>
            <MenuList
              bg={isProductInternmatch ? 'internmatch.primary' : 'white'}
              borderBottomRadius={isProductInternmatch ? '1.88rem' : '0.5rem'}
              h="10rem"
              overflow="auto"
            >
              {map(time => {
                return (
                  <MenuItem
                    isolation={'isolate'}
                    color={isProductInternmatch ? 'white' : `${realm}.primary`}
                    fontSize={'sm'}
                    bg="transparent"
                    _focus={{
                      bg: 'transparent',
                    }}
                    _hover={{
                      color: `${realm}.primary`,
                      background: `${realm}.secondary`,
                    }}
                    value={time}
                    onClick={time => {
                      setuserInput(time.target.value)
                    }}
                  >
                    {time}
                  </MenuItem>
                )
              })(times)}
            </MenuList>
          </Menu>
        </InputLeftElement>
      </Box>
    )
  }

  return (
    <Box position={'relative'} mt={isFocused ? 6 : 0} transition="all 0.25s ease">
      <HStack
        ref={labelRef}
        paddingStart={isFocused ? 6 : 10}
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
      {
        <InputGroup>
          <ClockMenu />
          <Input
            isInvalid={isInvalid}
            test-id={questionCode}
            as={InputMask}
            mask={inputmask}
            formatChars={maskFormatChars}
            maskChar={null}
            id={questionCode}
            ref={inputRef}
            onClick={() => setIsFocused(true)}
            onBlur={onBlur}
            onChange={e => {
              setuserInput(e.target.value)
            }}
            value={userInput || ''}
            type="time"
            height={'3rem'}
            paddingInlineEnd={6}
            paddingInlineStart={10}
            {...inputStyles}
            color={isFocused || !!userInput ? inputStyles.color : 'transparent'}
          />
        </InputGroup>
      }
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

const Time = {
  Write,
  Read,
}

export default Time
