import { Box, HStack, Textarea, useTheme } from '@chakra-ui/react'
import { useEffect, useRef, useState } from 'react'

import { faCheckCircle } from '@fortawesome/free-solid-svg-icons'
import { FontAwesomeIcon } from '@fortawesome/react-fontawesome'
import useClearFieldMessage from 'app/DTT/helpers/clear-field-message'
import ErrorDisplay from 'app/DTT/helpers/error-display'
import useStyles from 'app/DTT/inputStyles'
import MandatorySymbol from 'app/layouts/components/form/mandatory-symbol'
import debounce from 'lodash.debounce'
import { useError } from 'utils/contexts/ErrorContext'
import { ACTIONS } from 'utils/contexts/ErrorReducer'
import { useIsFieldNotEmpty } from 'utils/contexts/IsFieldNotEmptyContext'
import useGetFieldMessage from 'utils/fieldMessage'
import { isNotStringifiedEmptyArray } from 'utils/functionals'
import { getIsInvalid } from 'utils/functions'
import { useIsProductInternmatch } from 'utils/helpers/check-product-name'
import useGetProductName from 'utils/helpers/get-product-name'
import { isNotNullOrUndefinedOrEmpty } from 'utils/helpers/is-null-or-undefined.js'
import useProductColors from 'utils/productColors'

export const Read = ({ data, config = {} }) => {
  return <Textarea {...config}>{data?.value || config.defaultValue}</Textarea>
}

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
  onChange,
  sanatise,
}) => {
  let regex
  const theme = useTheme()
  const labelRef = useRef()
  const realm = useGetProductName().toLowerCase()
  const isProductInternMatch = useIsProductInternmatch()

  const { labelTextColor } = useProductColors()

  const { dispatch } = useError()
  const [errorStatus, setErrorStatus] = useState(false)
  const [userInput, setuserInput] = useState(data?.value)
  const { dispatchFieldMessage } = useIsFieldNotEmpty()
  const [isFocused, setIsFocused] = useState(false)

  try {
    regex = RegExp(regexPattern)
  } catch (err) {
    console.error('There is an error with the regex', questionCode, err)
    regex = undefined
  }

  const inputRef = useRef()
  const isInvalid = getIsInvalid(userInput)(regex)

  let hasErrorMessage = isNotNullOrUndefinedOrEmpty(errorMessage)

  const { errorState } = useError()
  const { fieldState } = useIsFieldNotEmpty()

  const failedValidation = errorState[questionCode]
  const fieldNotEmpty = fieldState[questionCode]

  const { hasFieldMessage, fieldMessage } = useGetFieldMessage(parentCode, questionCode)
  const handleClearFieldMessage = useClearFieldMessage(parentCode, attributeCode, questionCode)

  const handleChange = e => {
    setuserInput(e.target.value)
    if (onChange) {
      onChange(e)
    }
  }

  useEffect(() => {
    userInput ? setIsFocused(true) : setIsFocused(false)
  }, [userInput])

  useEffect(() => {
    isInvalid ? setErrorStatus(true) : setErrorStatus(false)
  }, [isInvalid, setErrorStatus])

  useEffect(() => {
    setuserInput(data?.value || '')
  }, [data, setuserInput])

  useEffect(() => {
    isInvalid
      ? dispatch({ type: ACTIONS.SET_TO_TRUE, payload: questionCode })
      : dispatch({ type: ACTIONS.SET_TO_FALSE, payload: questionCode })
  }, [dispatch, isInvalid, questionCode])

  const debouncedSendAnswer = debounce(onSendAnswer, 500)

  const onBlur = e => {
    e.target.value ? setIsFocused(true) : setIsFocused(false)

    const clean = sanatise ? sanatise(e.target.value) : e.target.value

    !errorStatus && debouncedSendAnswer(clean)

    dispatchFieldMessage({ payload: questionCode })
    hasFieldMessage && handleClearFieldMessage()
  }

  const hasValidData = userInput && !isInvalid
  const { inputStyles, labelStyles } = useStyles(hasValidData, isFocused)

  return (
    <Box position={'relative'} mt={isFocused ? 6 : 0} transition="all 0.25s ease">
      <HStack
        ref={labelRef}
        paddingStart={isFocused || isProductInternMatch ? 6 : 12}
        {...labelStyles}
        top={isFocused ? `calc(-${labelRef?.current?.clientHeight}px - .25rem)` : 0}
        h={isFocused ? labelRef?.current?.clientHeight : 'full'}
      >
        {placeholderName && (
          <MandatorySymbol
            placeholderName={placeholderName}
            labelTextColor={isProductInternMatch ? `${realm}.primary` : labelTextColor}
            realm={realm}
            mandatory={mandatory}
          />
        )}

        {(!failedValidation && fieldNotEmpty) ||
        (!failedValidation && userInput && isNotStringifiedEmptyArray(userInput)) ? (
          <FontAwesomeIcon opacity="0.5" color="green" icon={faCheckCircle} />
        ) : null}
      </HStack>

      <Textarea
        id={questionCode}
        test-id={questionCode}
        ref={inputRef}
        onFocus={() => {
          setIsFocused(true)
        }}
        onBlur={onBlur}
        onChange={handleChange}
        value={userInput}
        isInvalid={isInvalid}
        paddingBlock={2}
        paddingInline={6}
        {...inputStyles}
      />
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

const TextArea = {
  Write,
  Read,
}

export default TextArea
