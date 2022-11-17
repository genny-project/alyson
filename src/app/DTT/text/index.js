// import { ACKMESSAGEKEY, maxNumberOfRetries } from 'utils/constants'
// import { Box, Text as ChakraText, HStack, Input, VStack, useTheme } from '@chakra-ui/react'
// import { faCalendar, faCheckCircle } from '@fortawesome/free-solid-svg-icons'
// import { useEffect, useRef, useState } from 'react'

// import { ACTIONS } from 'utils/contexts/ErrorReducer'
// import AnswerAcknowledge from 'app/layouts/components/form/answer_acknowledge'
// import DetailViewTags from 'app/DTT/text/detailview_tags'
// import { FontAwesomeIcon } from '@fortawesome/react-fontawesome'
// import InputMask from 'react-input-mask'
// import MandatorySymbol from 'app/layouts/components/form/mandatory-symbol'
// import debounce from 'lodash.debounce'
// import { getIsInvalid } from 'utils/functions'
// import { isNotNullOrUndefinedOrEmpty } from 'utils/helpers/is-null-or-undefined'
// import { selectCode } from 'redux/db/selectors'
// import { useError } from 'utils/contexts/ErrorContext'
// import useGetFieldMessage from 'utils/fieldMessage'
// import { useIsFieldNotEmpty } from 'utils/contexts/IsFieldNotEmptyContext'
// import useProductColors from 'utils/productColors'
// import { useSelector } from 'react-redux'

// export const Write = ({
//   questionCode,
//   data,
//   onSendAnswer,
//   regexPattern,
//   errorMessage,
//   parentCode,
//   placeholderName,
//   mandatory,
//   inputmask,
//   BackgroundColor,
//   BorderColor,
//   BorderHoverColor,
//   PlaceholderColor,
//   LabelTextColor,
// }) => {
//   let regex
//   const [errorStatus, setErrorStatus] = useState(false)
//   const [userInput, setuserInput] = useState(data?.value || '')
//   const [isFocused, setIsFocused] = useState(false)
//   const inputRef = useRef()
//   const retrySendingAnswerRef = useRef(0)

//   const theme = useTheme()
//   const { dispatch } = useError()
//   const { dispatchFieldMessage } = useIsFieldNotEmpty()
//   const { errorState } = useError()
//   const { hasFieldMessage, fieldMessage } = useGetFieldMessage(parentCode, questionCode)
//   const {
//     fieldBackgroundColor,
//     fieldBorderColor,
//     fieldHoverBorderColor,
//     fieldTextColor,
//     labelTextColor,
//     borderRadius,
//   } = useProductColors()

//   let hasErrorMessage = isNotNullOrUndefinedOrEmpty(errorMessage)
//   const failedValidation = errorState[questionCode]
//   const isInvalid = getIsInvalid(userInput)(regex)
//   const debouncedSendAnswer = debounce(onSendAnswer, 500)
//   const ackMessageObject = useSelector(selectCode(ACKMESSAGEKEY))
//   const ackMessageValue = ackMessageObject?.[questionCode] || ''

//   const onBlur = e => {
//     e.target.value ? setIsFocused(true) : setIsFocused(false)
//     !errorStatus && debouncedSendAnswer(userInput)
//     dispatchFieldMessage({ payload: questionCode })
//   }

//   try {
//     regexPattern = regexPattern.replaceAll('\\\\', '\\')
//     regex = RegExp(regexPattern)
//   } catch (err) {
//     console.error('There is an error with the regex', questionCode, err)
//     regex = undefined
//   }

//   useEffect(() => {
//     userInput ? setIsFocused(true) : setIsFocused(false)
//   }, [userInput])

//   useEffect(() => {
//     setuserInput(data?.value)
//   }, [data, setuserInput])

//   useEffect(() => {
//     isInvalid ? setErrorStatus(true) : setErrorStatus(false)
//   }, [isInvalid, setErrorStatus])

//   useEffect(() => {
//     isInvalid
//       ? dispatch({ type: ACTIONS.SET_TO_TRUE, payload: questionCode })
//       : dispatch({ type: ACTIONS.SET_TO_FALSE, payload: questionCode })
//   }, [dispatch, isInvalid, questionCode])

//   useEffect(() => {
//     const timer = setInterval(() => {
//       if (retrySendingAnswerRef.current < maxNumberOfRetries) {
//         !errorStatus && !ackMessageValue && userInput && debouncedSendAnswer(userInput)
//         retrySendingAnswerRef.current = retrySendingAnswerRef.current + 1
//       }
//     }, 5000)
//     return () => clearInterval(timer)
//   }, [ackMessageValue, debouncedSendAnswer, errorStatus, userInput])

//   useEffect(() => {
//     retrySendingAnswerRef.current = 0
//   }, [userInput])

//   return (
//     <Box position={'relative'} mt={isFocused ? 6 : 0} transition="all 0.25s ease">
//       <HStack
//         position={'absolute'}
//         zIndex={theme.zIndices.docked}
//         top={isFocused ? '-1.5rem' : 3}
//         left={0}
//         paddingStart={6}
//         w="full"
//         justifyContent={'space-between'}
//         pointerEvents={'none'}
//         transition="all 0.25s ease"
//       >
//         <MandatorySymbol
//           placeholderName={placeholderName}
//           mandatory={mandatory}
//           labelTextColor={LabelTextColor || labelTextColor}
//         />
//         <AnswerAcknowledge
//           failedValidation={failedValidation}
//           userInput={userInput}
//           retrySendingAnswerRef={retrySendingAnswerRef}
//           questionCode={questionCode}
//         />
//       </HStack>

//       <Input
//         as={InputMask}
//         mask={inputmask}
//         maskChar={null}
//         test-id={questionCode}
//         id={questionCode}
//         ref={inputRef}
//         onFocus={() => {
//           setIsFocused(true)
//         }}
//         onBlur={onBlur}
//         onChange={e => setuserInput(e.target.value)}
//         value={userInput || ''}
//         isInvalid={isInvalid}
//         w="full"
//         h={'auto'}
//         paddingBlock={3}
//         paddingInline={6}
//         bg={BackgroundColor || fieldBackgroundColor}
//         borderRadius={borderRadius}
//         borderColor={BorderColor || fieldBorderColor}
//         fontSize={'sm'}
//         fontWeight={'medium'}
//         color={PlaceholderColor || fieldTextColor}
//         cursor={'pointer'}
//         _hover={{
//           borderColor: BorderHoverColor || fieldHoverBorderColor,
//           boxShadow: 'lg',
//         }}
//         _focusVisible={{
//           borderColor: 'product.secondary',
//           boxShadow: 'initial',
//         }}
//         _invalid={{
//           background: 'error.50',
//           borderColor: 'error.500',
//           color: 'error.500',
//         }}
//         _disabled={{
//           borderColor: 'gray.300',
//           background: 'gray.100',
//         }}
//       />

//       {errorStatus && (
//         <VStack alignItems="start">
//           {(hasFieldMessage || hasErrorMessage) && (
//             <ChakraText textStyle="product.errorText">
//               {hasFieldMessage ? fieldMessage : errorMessage}
//             </ChakraText>
//           )}
//         </VStack>
//       )}
//     </Box>
//   )
// }

// export const Read = ({
//   data,
//   config = {},
//   hasIndicatorIcon,
//   TextSize,
//   TextColor,
//   TextContent,
//   TextWeight,
// }) => {
//   const { detailViewTags } = config
//   const storyConfigs = {
//     fontSize: TextSize,
//     color: TextColor,
//     fontWeight: TextWeight,
//   }
//   if (detailViewTags) {
//     return <DetailViewTags data={data} />
//   }

//   if (hasIndicatorIcon) {
//     return data?.value === 'UNFINISHED' ? (
//       <FontAwesomeIcon icon={faCalendar} color={'#C0C0C0'} />
//     ) : (
//       <FontAwesomeIcon icon={faCheckCircle} color={'#006400'} />
//     )
//   }

//   return (
//     <ChakraText {...storyConfigs} {...config}>
//       {TextContent || data?.value || config.defaultValue}
//     </ChakraText>
//   )
// }

// const Text = {
//   Write,
//   Read,
// }

// export default Text

import { Box, Text as ChakraText, HStack, Input, VStack, useTheme } from '@chakra-ui/react'
import { faCalendar, faCheckCircle } from '@fortawesome/free-solid-svg-icons'
import { useEffect, useRef, useState } from 'react'

import DetailViewTags from 'app/DTT/text/detailview_tags'
import { FontAwesomeIcon } from '@fortawesome/react-fontawesome'
import MandatorySymbol from 'app/layouts/components/form/mandatory-symbol'
import useProductColors from 'utils/productColors'

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
  clientId,
  isInvalid,
  BackgroundColor,
  BorderColor,
  BorderHoverColor,
  PlaceholderColor,
  LabelTextColor,
}) => {
  let regex

  const [userInput, setuserInput] = useState(data?.value || '')
  const [isFocused, setIsFocused] = useState(false)
  const inputRef = useRef()

  // const retrySendingAnswerRef = useRef(0)

  const theme = useTheme()
  // const { dispatch } = useError() || {}
  // const { dispatchFieldMessage } = useIsFieldNotEmpty() || {}

  // const { errorState } = useError() || {}
  // const { hasFieldMessage, fieldMessage } = useGetFieldMessage(parentCode, questionCode)
  const hasFieldMessage = false
  const fieldMessage = 'Please enter valid data.'

  const {
    fieldBackgroundColor,
    fieldBorderColor,
    fieldHoverBorderColor,
    fieldTextColor,
    labelTextColor,
    borderRadius,
  } = useProductColors()

  console.log(isInvalid)

  // let hasErrorMessage = isNotNullOrUndefinedOrEmpty(errorMessage)

  const [showErrorMessage, setShowErrorMessage] = useState(false)

  // const failedValidation = errorState[questionCode]
  const failedValidation = false
  const errorStatus = isInvalid
  // const [errorStatus, setErrorStatus] = useState(isInvalid)

  // const isInvalid = getIsInvalid(userInput)(regex)
  // const debouncedSendAnswer = debounce(onSendAnswer, 500)
  // const ackMessageObject = useSelector(selectCode(ACKMESSAGEKEY))
  // const ackMessageValue = ackMessageObject?.[questionCode] || ''

  // const inputmaskFilter = value => inputmask => {
  //   // check if inputmask only contains digits
  //   let filteredValue = ''
  //   if (value && inputmask && /^\d+$/.test(inputmask)) {
  //     // allow a leading '+' to phone number, otherwise break validations
  //     if (value.length > 0 && /^\+/.test(value)) {
  //       filteredValue = '+' + value.substring(1).replace(/\D/g, '')
  //     } else {
  //       filteredValue = value.replace(/\D/g, '')
  //     }
  //   }
  //   return filteredValue ? filteredValue.substring(0, inputmask.length) : value
  // }

  try {
    regexPattern = regexPattern.replaceAll('\\\\', '\\')
    regex = RegExp(regexPattern)
  } catch (err) {
    console.error('There is an error with the regex', questionCode, err)
    regex = undefined
  }

  useEffect(() => {
    userInput ? setIsFocused(true) : setIsFocused(false)
    isInvalid ? setShowErrorMessage(true) : setShowErrorMessage(false)
  }, [userInput, isInvalid])

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

  const onBlur = () => {
    userInput ? setIsFocused(true) : setIsFocused(false)
    userInput ? setShowErrorMessage(false) : setShowErrorMessage(true)
    // userInput ? setErrorStatus(false) : setErrorStatus(true)
  }

  // useEffect(() => {
  //   isInvalid ? setErrorStatus(true) : setErrorStatus(false)
  // }, [isInvalid, setErrorStatus])

  return (
    <Box position={'relative'} mt={isFocused ? 6 : 0} transition="all 0.25s ease">
      <HStack
        position={'absolute'}
        zIndex={theme?.zIndices?.docked}
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
          LabelTextColor={LabelTextColor}
          PlaceholderColor={PlaceholderColor}
        />
        {/* <AnswerAcknowledge
          failedValidation={failedValidation}
          userInput={userInput}
          retrySendingAnswerRef={retrySendingAnswerRef}
          questionCode={questionCode}
        /> */}
      </HStack>

      <Input
        test-id={questionCode}
        id={questionCode}
        ref={inputRef}
        onFocus={() => {
          setIsFocused(true)
        }}
        onBlur={onBlur}
        onChange={e => {
          setuserInput(e.target.value)
        }}
        value={userInput || ''}
        isInvalid={mandatory && errorStatus}
        w="full"
        h={'2.75rem'}
        paddingBlock={3}
        paddingInline={6}
        bg={BackgroundColor || fieldBackgroundColor}
        borderRadius={borderRadius}
        borderColor={BorderColor || fieldBorderColor}
        fontSize={'sm'}
        fontWeight={'medium'}
        color={PlaceholderColor || fieldTextColor}
        cursor={'pointer'}
        isRequired={mandatory}
        _hover={{
          borderColor: BorderHoverColor || fieldHoverBorderColor,
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

      {errorStatus && mandatory && (
        <VStack alignItems="start">
          {(hasFieldMessage || showErrorMessage) && (
            <ChakraText textStyle="tail.error">
              {hasFieldMessage ? fieldMessage : errorMessage}
            </ChakraText>
          )}
        </VStack>
      )}
    </Box>
  )
}

export const Read = ({
  data,
  config = {},
  hasIndicatorIcon,
  TextSize,
  TextColor,
  TextContent,
  TextWeight,
}) => {
  const { detailViewTags } = config
  const storyConfigs = {
    fontSize: TextSize,
    color: TextColor,
    fontWeight: TextWeight,
  }

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
    <ChakraText {...storyConfigs} {...config}>
      {TextContent || data?.value || config.defaultValue}
    </ChakraText>
  )
}

const Text = {
  Write,
  Read,
}

export default Text
