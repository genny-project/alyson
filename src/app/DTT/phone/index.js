/* eslint-disable react-hooks/exhaustive-deps */

import {
  Box,
  Button,
  HStack,
  Input,
  InputAddon,
  InputGroup,
  InputLeftAddon,
  Modal,
  Popover,
  PopoverArrow,
  PopoverBody,
  PopoverContent,
  PopoverTrigger,
  Portal,
  Text,
  useClipboard,
  useDisclosure,
  useTheme,
  useToast,
} from '@chakra-ui/react'
import { faAngleDown, faCheckCircle } from '@fortawesome/free-solid-svg-icons'
import { compose, equals, forEach, map, pathOr, slice } from 'ramda'
import { useCallback, useEffect, useMemo, useRef, useState } from 'react'
import { ACKMESSAGEKEY, maxNumberOfRetries } from 'utils/constants'
import { getCountryInfoFromCountryList, getCountryObjectFromUserInput } from './helpers'
import { FixedSizeList } from 'react-window'
import { FontAwesomeIcon } from '@fortawesome/react-fontawesome'
import useClearFieldMessage from 'app/DTT/helpers/clear-field-message'
import ErrorDisplay from 'app/DTT/helpers/error-display'
import useStyles from 'app/DTT/inputStyles'
import AnswerAcknowledge from 'app/layouts/components/form/answer_acknowledge'
import MandatorySymbol from 'app/layouts/components/form/mandatory-symbol'
import debounce from 'lodash.debounce'
import InputMask from 'react-input-mask'
import { useSelector } from 'react-redux'
import { selectCode } from 'redux/db/selectors'
import { useError } from 'utils/contexts/ErrorContext'
import { ACTIONS } from 'utils/contexts/ErrorReducer'
import { useIsFieldNotEmpty } from 'utils/contexts/IsFieldNotEmptyContext'
import useGetFieldMessage from 'utils/fieldMessage'
import phoneNumberFormatter from 'utils/formatters/phone-number'
import { getIsInvalid } from 'utils/functions'
import { useIsProductInternmatch } from 'utils/helpers/check-product-name'
import useGetProductName from 'utils/helpers/get-product-name'
import { isNotNullOrUndefinedOrEmpty } from 'utils/helpers/is-null-or-undefined'
import useProductColors from 'utils/productColors'
import countryList from './helpers/country-list'
import { Select } from 'chakra-react-select'
import ReactSelect from 'react-select'

const Write = ({
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
  const formatChars = {
    //- is included due to certain island nations using them
    P: '[+0123456789]',
    0: '[-0123456789]',
  }
  const mask = `P00000000000`
  const [errorStatus, setErrorStatus] = useState(false)
  const [userInput, setuserInput] = useState(data?.value || '')
  const [isFocused, setIsFocused] = useState(false)
  const [countryCode, setCountryCode] = useState(null)
  const [countryFlag, setCountryFlag] = useState(null)
  const [countryMenuList, setCountryMenuList] = useState(null)
  const [inputValue, setInputValue] = useState(countryFlag)
  const [isDuplicatedCountryCode, setIsDuplicatedCountryCode] = useState(false)
  const inputRef = useRef()
  const labelRef = useRef()
  const retrySendingAnswerRef = useRef(0)
  const { dispatch } = useError()
  const { dispatchFieldMessage } = useIsFieldNotEmpty()
  const { errorState } = useError()
  const { hasFieldMessage, fieldMessage } = useGetFieldMessage(parentCode, questionCode)
  const { labelTextColor } = useProductColors()
  const handleClearFieldMessage = useClearFieldMessage(parentCode, attributeCode, questionCode)
  const { isOpen, onToggle, onClose } = useDisclosure()
  let hasErrorMessage = isNotNullOrUndefinedOrEmpty(errorMessage)
  const failedValidation = errorState[questionCode]
  const isInvalid = getIsInvalid(userInput)(regex)
  const debouncedSendAnswer = debounce(onSendAnswer, 500)
  const ackMessageObject = compose(useSelector, selectCode)(ACKMESSAGEKEY)
  const ackMessageValue = ackMessageObject?.[questionCode] || ''

  const realm = useGetProductName().toLowerCase()
  const isProductInternMatch = useIsProductInternmatch()

  let countryObject = useMemo(() => getCountryObjectFromUserInput(userInput), [userInput])
  let getSpecificCountryInfo = useMemo(() => getCountryInfoFromCountryList(userInput), [userInput])
  let countryObjectFromUserInput = pathOr({}, [0])(countryObject)
  let { code, icon } = countryObjectFromUserInput
  let countryCodeFromUserInput = !!code ? code : ''
  let countryFlagFromUserInput = !!icon ? icon : ''
  const hasValidData = userInput && !isInvalid
  const { inputStyles, labelStyles } = useStyles(hasValidData, isFocused)
  const theme = useTheme()
  const onBlur = e => {
    e.target.value ? setIsFocused(true) : setIsFocused(false)
    !errorStatus && debouncedSendAnswer(userInput)
    dispatchFieldMessage({ payload: questionCode })
    hasFieldMessage && handleClearFieldMessage()
  }

  const handleSelectCountry = (code, icon) => {
    setuserInput(code)
    setCountryCode(code)
    setCountryFlag(icon)
    setInputValue(icon)
    onToggle()
    equals(code)('+1') && setIsDuplicatedCountryCode(true)
  }

  useEffect(() => {
    let firstTwoCharacters = userInput.slice(0, 2)
    equals(firstTwoCharacters)('+1')
      ? setIsDuplicatedCountryCode(true)
      : setIsDuplicatedCountryCode(false)
  }, [userInput])

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
    !!countryIcon && !isDuplicatedCountryCode && setCountryFlag(countryIcon)
    if (!isDuplicatedCountryCode) {
      !!countryFlagFromUserInput ? setCountryFlag(countryFlagFromUserInput) : setCountryFlag('Code')
    }
  }, [userInput, isDuplicatedCountryCode])

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

  useEffect(() => {
    !!countryCodeFromUserInput ? setCountryCode(countryCodeFromUserInput) : setCountryCode('')
  }, [countryCode])

  const countryItem = ({ index, style }) => {
    const { icon, code, name } = countryList[index]
    console.log('style ', style)
    return (
      <div style={style}>
        <Button
          w="full"
          textTransform={'none'}
          fontWeight={300}
          justifyContent="flex-start"
          bg="transparent"
          h={'2rem'}
          // padding={0}
          key={`${code}-${name}`}
          onClick={() => handleSelectCountry(code, icon)}
        >
          {`rrr ${icon} ${code} ${name}`}
        </Button>
      </div>
    )
  }
  const countryOptions = []
  const onInputChange = input => {
    setInputValue(countryFlag)
    console.log('Input change ', input, countryFlag)
  }
  forEach(
    i => countryOptions.push({ value: i, label: `${i.icon} ${i.code} ${i.name}` }),
    countryList,
  )
  console.log('Country flag is ', countryFlag)
  return (
    <Box position={'relative'} mt={isFocused ? 6 : 0} transition="all 0.25s ease">
      <HStack
        ref={labelRef}
        paddingStart={isFocused ? 6 : 20}
        // {...labelStyles}
        top={isFocused ? `calc(-${labelRef?.current?.clientHeight}px - .25rem)` : 4}
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

      <HStack spacing={0}>
        {/* <Select 
      components={<Portal ><FixedSizeList
        zIndex={"popover"}
              //cannot supply REM value 
              height={parseInt(window.getComputedStyle(document.documentElement).fontSize) * 20}
              itemSize={parseInt(getComputedStyle(document.documentElement).fontSize) * 2}
              itemCount={countryList.length}
            >
              {countryItem}
            </FixedSizeList></Portal>} options={countryOptions} /> */}
        {/* <Popover 
          isOpen={isOpen}
          placement='bottom-start'
          returnFocusOnClose={false}
          onClose={onClose}
          preventOverflow={true}
        >
          <PopoverTrigger>
            <Button
              _focus={{borderColor:'transparent'}}
              as={Button}
              bg="transparent"
              position={'absolute'}
              zIndex={10}
              onClick={onToggle}
              _hover={{ background: 'transparent', color: `${realm}.primary` }}
              _active={{ background: 'transparent' }}
              _focusVisible={{ background: 'transparent' }}
            >
              <HStack>
                <Text fontSize={'md'}>{!!countryFlag ? `${countryFlag}` : 'Code'}</Text>
                <FontAwesomeIcon color={`${realm}.primary`} icon={faAngleDown} size="sm" />
              </HStack>
            </Button>
          </PopoverTrigger>
          <Portal>
          <PopoverContent  
          zIndex={"popover"}>
            <PopoverArrow/>
            <PopoverBody
            
            padding={0}>
            <FixedSizeList
              //cannot supply REM value 
              height={parseInt(window.getComputedStyle(document.documentElement).fontSize) * 20}
              itemSize={parseInt(getComputedStyle(document.documentElement).fontSize) * 2}
              itemCount={countryList.length}
            >
              {countryItem}
            </FixedSizeList>
            </PopoverBody>
          </PopoverContent>
          </Portal>
        </Popover> */}
        <InputGroup>
          <InputAddon>
            <ReactSelect
              // onMenuOpen={()=>{}}
              inputValue={inputValue}
              blurInputOnSelect={false}
              filterOption={() => true}
              onChange={selection =>
                handleSelectCountry(selection.value.code, selection.value.icon)
              }
              styles={{
                control: base => ({ ...base, zIndex: 66 }),
                menu: base => ({ ...base, zIndex: 294999, width: 'full' }),
              }}
              // position={'absolute'}
              onInputChange={onInputChange}
              left={0}
              top={0}
              // menuIsOpen={false}
              options={countryOptions}
            />
          </InputAddon>
          <Input
            zIndex={'5'}
            as={InputMask}
            mask={mask}
            formatChars={formatChars}
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
            paddingBlock={3}
            paddingInlineEnd={6}
            {...inputStyles}
          />
        </InputGroup>
      </HStack>

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
