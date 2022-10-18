/* eslint-disable react-hooks/exhaustive-deps */

import { ACKMESSAGEKEY, maxNumberOfRetries } from 'utils/constants'
import {
  Box,
  Button,
  HStack,
  Input,
  Menu,
  MenuButton,
  MenuItem,
  MenuList,
  Text,
  VStack,
  useClipboard,
  useTheme,
  useToast,
} from '@chakra-ui/react'
import { compose, map, pathOr } from 'ramda'
import { faAngleDown, faCheckCircle } from '@fortawesome/free-solid-svg-icons'
import { useEffect, useRef, useState, useMemo } from 'react'
import { useSelector } from 'react-redux'
import debounce from 'lodash.debounce'
import { FontAwesomeIcon } from '@fortawesome/react-fontawesome'
import InputMask from 'react-input-mask'

import { ACTIONS } from 'utils/contexts/ErrorReducer'
import AnswerAcknowledge from 'app/layouts/components/form/answer_acknowledge'
import MandatorySymbol from 'app/layouts/components/form/mandatory-symbol'
import countryList from './helpers/country-list'
import { getIsInvalid } from 'utils/functions'
import { isNotNullOrUndefinedOrEmpty } from 'utils/helpers/is-null-or-undefined'
import phoneNumberFormatter from 'utils/formatters/phone-number'
import { selectCode } from 'redux/db/selectors'
import { useError } from 'utils/contexts/ErrorContext'
import useGetFieldMessage from 'utils/fieldMessage'
import { useIsFieldNotEmpty } from 'utils/contexts/IsFieldNotEmptyContext'
import useProductColors from 'utils/productColors'
import { getCountryInfoFromCountryList, getCountryObjectFromUserInput } from './helpers'

const Write = ({
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
  const mask = `99999999999`
  const [errorStatus, setErrorStatus] = useState(false)
  const [userInput, setuserInput] = useState(data?.value || '')
  const [isFocused, setIsFocused] = useState(false)
  const [countryCode, setCountryCode] = useState(null)
  const [countryFlag, setCountryFlag] = useState(null)
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

  let getSpecificCountryInfo = useMemo(() => getCountryInfoFromCountryList(userInput), [userInput])

  const onBlur = e => {
    e.target.value ? setIsFocused(true) : setIsFocused(false)
    !errorStatus && debouncedSendAnswer(userInput)
    dispatchFieldMessage({ payload: questionCode })
  }

  const handleSelectCountry = (code, icon) => {
    setCountryCode(code)
    setCountryFlag(icon)
    setuserInput(code)
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
    retrySendingAnswerRef.current = 0
    let countryIcon = getSpecificCountryInfo('icon')
    !!countryIcon && setCountryFlag(countryIcon)
  }, [userInput])

  useEffect(() => {
    !!data?.value && setuserInput(data?.value)
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

  return (
    <Box position={'relative'} mt={isFocused ? 6 : 0} transition="all 0.25s ease">
      <HStack
        position={'absolute'}
        zIndex={theme.zIndices.docked}
        top={isFocused ? '-1.5rem' : 3}
        left={0}
        paddingStart={isFocused ? 6 : 20}
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
      <HStack spacing={0}>
        {
          <Menu>
            <MenuButton
              as={Button}
              bg="transparent"
              position={'absolute'}
              zIndex={10}
              _active={{ background: 'transparent' }}
            >
              <HStack>
                <Text>{!!countryFlag ? `${countryFlag}` : 'Code'}</Text>
                <FontAwesomeIcon color="gray" icon={faAngleDown} size="sm" />
              </HStack>
            </MenuButton>
            <MenuList zIndex={100} overflow={'auto'} maxH={'20rem'}>
              {map(({ code, icon, name }) => (
                <MenuItem onClick={() => handleSelectCountry(code, icon)}>
                  {`${icon} ${code} ${name}`}
                </MenuItem>
              ))(countryList)}
            </MenuList>
          </Menu>
        }

        <Input
          as={InputMask}
          mask={mask}
          maskChar={null}
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
          paddingInlineStart={20}
          paddingInlineEnd={6}
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
              <Text textStyle="product.errorText">
                {hasFieldMessage ? fieldMessage : errorMessage}
              </Text>
            )}
          </VStack>
        )}
      </HStack>
    </Box>
  )
}

const Read = ({ data, config }) => {
  const { onCopy } = useClipboard(data.value)
  const toast = useToast()

  if (!data?.value) return null

  const onClick = () => {
    onCopy()
    toast({
      status: 'success',
      duration: 1000,
      render: () => (
        <HStack
          paddingBlock={5}
          paddingInline={6}
          bg="success.100"
          borderWidth={'1px'}
          borderColor={'success.500'}
          borderRadius={'lg'}
        >
          <FontAwesomeIcon color="#00AFAB" icon={faCheckCircle} size="lg" />
          <Text color="text.light">{`${data?.value} copied!`}</Text>
        </HStack>
      ),
    })
  }
  return (
    <Text cursor="pointer" w="10rem" onClick={onClick} {...config}>
      {phoneNumberFormatter(data.value)}
    </Text>
  )
}

const Phone = {
  Write,
  Read,
}

export default Phone
