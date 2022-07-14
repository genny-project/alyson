import { Text, Textarea, VStack } from '@chakra-ui/react'
import { useEffect, useRef, useState } from 'react'

import { ACTIONS } from 'utils/contexts/ErrorReducer'
import debounce from 'lodash.debounce'
import { getIsInvalid } from 'utils/functions'
import { isNotNullOrUndefinedOrEmpty } from 'utils/helpers/is-null-or-undefined.js'
import { selectFieldMessage } from 'redux/app/selectors'
import { useError } from 'utils/contexts/ErrorContext'
import { useIsFieldNotEmpty } from 'utils/contexts/IsFieldNotEmptyContext'
import { useMobileValue } from 'utils/hooks'
import { useSelector } from 'react-redux'

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
  properties,
  realm,
}) => {
  let regex
  const { dispatch } = useError()
  const [errorStatus, setErrorStatus] = useState(false)
  const [userInput, setuserInput] = useState(data?.value)
  const { dispatchFieldMessage } = useIsFieldNotEmpty()

  const fieldBgColor = properties.fieldBgColor
  const secondaryColor = properties.secondaryColor

  try {
    regex = RegExp(regexPattern)
  } catch (err) {
    console.error('There is an error with the regex', questionCode, err)
    regex = undefined
  }

  const inputRef = useRef()
  const isInvalid = getIsInvalid(userInput)(regex)
  const fieldMessageObject = useSelector(selectFieldMessage)
  const fieldMessage = fieldMessageObject[`${parentCode}@${questionCode}`]
  let hasFieldMessage = isNotNullOrUndefinedOrEmpty(fieldMessage)
  let hasErrorMessage = isNotNullOrUndefinedOrEmpty(errorMessage)

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

  const maxW = useMobileValue(['', '25vw'])

  const onBlur = e => {
    !errorStatus && debouncedSendAnswer(e.target.value)
    dispatchFieldMessage({ payload: questionCode })
  }

  return realm === 'lojing' ? (
    <>
      <Textarea
        id={questionCode}
        test-id={questionCode}
        ref={inputRef}
        onBlur={onBlur}
        onChange={e => setuserInput(e.target.value)}
        value={userInput}
        maxW={maxW}
        isInvalid={isInvalid}
        paddingBlock={2}
        paddingInline={6}
        fontWeight={'medium'}
        borderColor={fieldBgColor}
        bg={fieldBgColor}
        h={'auto'}
        minH={'5.13rem'}
        fontSize={'sm'}
        _hover={{
          borderColor: { secondaryColor },
        }}
      />
      {errorStatus && (
        <VStack alignItems="start">
          {(hasFieldMessage || hasErrorMessage) && (
            <Text textStyle="tail.error" mt={2}>
              {hasFieldMessage ? fieldMessage : errorMessage}
            </Text>
          )}
        </VStack>
      )}
    </>
  ) : (
    <>
      <Textarea
        id={questionCode}
        test-id={questionCode}
        ref={inputRef}
        onBlur={onBlur}
        onChange={e => setuserInput(e.target.value)}
        value={userInput}
        maxW={maxW}
        isInvalid={isInvalid}
      />
      {errorStatus && (
        <VStack alignItems="start">
          {(hasFieldMessage || hasErrorMessage) && (
            <Text textStyle="tail.error" mt={2}>
              {hasFieldMessage ? fieldMessage : errorMessage}
            </Text>
          )}
        </VStack>
      )}
    </>
  )
}

const TextArea = {
  Write,
  Read,
}

export default TextArea
