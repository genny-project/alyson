/* eslint-disable react-hooks/exhaustive-deps */
import { Text, useClipboard, useToast } from '@chakra-ui/react'

import { FontAwesomeIcon } from '@fortawesome/react-fontawesome'
import { faCheckCircle, faAngleDown, faPhoneAlt } from '@fortawesome/free-solid-svg-icons'
import phoneNumberFormatter from 'utils/formatters/phone-number'

import { useEffect, useRef, useState } from 'react'
import {
  Box,
  Text as ChakraText,
  HStack,
  Input,
  VStack,
  useTheme,
  Menu,
  MenuButton,
  MenuList,
  MenuItem,
  Button,
} from '@chakra-ui/react'
import { useSelector } from 'react-redux'
import { ACTIONS } from 'utils/contexts/ErrorReducer'
import debounce from 'lodash.debounce'
import { getIsInvalid } from 'utils/functions'
import { isNotNullOrUndefinedOrEmpty } from 'utils/helpers/is-null-or-undefined'
import { useError } from 'utils/contexts/ErrorContext'
import useGetFieldMessage from 'utils/fieldMessage'
import { useIsFieldNotEmpty } from 'utils/contexts/IsFieldNotEmptyContext'
import useProductColors from 'utils/productColors'
import { selectCode } from 'redux/db/selectors'
import { maxNumberOfRetries, ACKMESSAGEKEY } from 'utils/constants'
import AnswerAcknowledge from 'app/layouts/components/form/answer_acknowledge'
import MandatorySymbol from 'app/layouts/components/form/mandatory-symbol'
import InputMask from 'react-input-mask'
import { map, compose, find, propEq, prop, path, split, tail } from 'ramda'

const countryList = [
  {
    name: 'Nepal',
    code: '977',
    icon: '🇳🇵',
  },
  {
    name: 'Australia',
    code: '61',
    icon: '🇦🇺',
  },
  {
    name: 'Indonesia',
    code: '62',
    icon: '🇮🇩',
  },
  {
    name: 'India',
    code: '91',
    icon: '🇮🇳',
  },
  {
    name: 'Qatar',
    code: '974',
    icon: '🇶🇦',
  },
]

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
  let phoneMask = useRef(inputmask)
  const mask = phoneMask?.current
  const [errorStatus, setErrorStatus] = useState(false)
  const [userInput, setuserInput] = useState(data?.value || '')
  const [isFocused, setIsFocused] = useState(false)
  const [countryCode, setCountryCode] = useState(null)
  const [countryFlag, setCountryFlag] = useState(null)
  const [selectedFromDropdown, setSelectedFromDropdown] = useState(false)
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

  const getPhoneMask = countryCode => selectedFromDropdown =>
    !!countryCode && selectedFromDropdown ? `+${countryCode} 999999999` : `+99999999999`

  const getUserInputWithoutPlusSign = input => {
    const splitAtPlusSign = split('+')
    const getFirstItemOffArray = path([0])
    const trimmedInput = compose(getFirstItemOffArray, tail, splitAtPlusSign)(input)
    return trimmedInput
  }

  const getCountryInfo = countryList => countryCode => requiredInfo => {
    let countryObject = find(propEq('code', countryCode))(countryList || [])
    let requiredCountryInfo = prop(requiredInfo)(countryObject)
    return requiredCountryInfo
  }

  const getCountryInfoFromCountryList = getCountryInfo(countryList)

  const onBlur = e => {
    e.target.value ? setIsFocused(true) : setIsFocused(false)
    !errorStatus && debouncedSendAnswer(userInput)
    dispatchFieldMessage({ payload: questionCode })
  }

  const handleSelectCountry = (code, icon) => {
    setSelectedFromDropdown(true)
    setCountryCode(code)
    setCountryFlag(icon)
    setuserInput(`+ ${code}`)
  }

  console.log('test-->', { selectedFromDropdown, countryCode, countryFlag, userInput })

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
    !!data?.value && setuserInput(data?.value)
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
        !errorStatus && !ackMessageValue && userInput && debouncedSendAnswer(userInput)
        retrySendingAnswerRef.current = retrySendingAnswerRef.current + 1
      }
    }, 5000)
    return () => clearInterval(timer)
  }, [ackMessageValue, debouncedSendAnswer, errorStatus, userInput])

  useEffect(() => {
    retrySendingAnswerRef.current = 0
  }, [userInput])

  useEffect(() => {
    phoneMask.current = getPhoneMask(countryCode)(selectedFromDropdown)
  }, [countryFlag, countryCode, userInput])

  useEffect(() => {
    setSelectedFromDropdown(false)
    let userInputWithoutPlusSign = getUserInputWithoutPlusSign(userInput)
    let getSpecificCountryInfo = getCountryInfoFromCountryList(userInputWithoutPlusSign)
    let countryIcon = getSpecificCountryInfo('icon')
    !!countryIcon && setCountryFlag(countryIcon)
  }, [userInput])

  useEffect(() => {
    countryFlag && selectedFromDropdown && setuserInput(`+${countryCode}`)
  }, [countryCode, countryFlag])

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
      <HStack>
        {
          <Menu>
            <MenuButton as={Button} bg="gray.300">
              <HStack>
                <Text>
                  {!!countryFlag ? (
                    `${countryFlag}`
                  ) : (
                    <FontAwesomeIcon color="#000000" icon={faPhoneAlt} size="sm" />
                  )}
                </Text>
                <FontAwesomeIcon color="gray" icon={faAngleDown} size="sm" />
              </HStack>
            </MenuButton>
            <MenuList zIndex={100}>
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
