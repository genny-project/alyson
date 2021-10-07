import { Text as ChakraText, Input } from '@chakra-ui/react'
import { useEffect, useRef, useState } from 'react'

import { ACTIONS } from 'utils/contexts/ErrorReducer'
import InputMask from 'react-input-mask'
import debounce from 'lodash.debounce'
import { getIsInvalid } from 'utils/functions'
import { useError } from 'utils/contexts/ErrorContext'
import { useMobileValue } from 'utils/hooks'

const CommonWriteComponent = ({
  questionCode,
  data,
  onSendAnswer,
  regexPattern,
  errorMsg,
  mask,
}) => {
  const { dispatch } = useError()
  const [errorStatus, setErrorStatus] = useState(false)
  const [userInput, setuserInput] = useState(data?.value)

  const regex = RegExp(regexPattern)

  const inputRef = useRef()
  const isInvalid = getIsInvalid(userInput)(regex)

  useEffect(() => {
    const listener = event => {
      if (event.code === 'Enter') {
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
    isInvalid === true ? setErrorStatus(true) : setErrorStatus(false)
  }, [isInvalid])

  useEffect(() => {
    isInvalid === true
      ? dispatch({ type: ACTIONS.SET_TO_TRUE, payload: questionCode })
      : dispatch({ type: ACTIONS.SET_TO_FALSE, payload: questionCode })
  }, [dispatch, isInvalid, questionCode])

  const debouncedSendAnswer = debounce(onSendAnswer, 500)

  const maxW = useMobileValue(['', '25vw'])

  return (
    <>
      <InputMask
        mask={mask}
        alwaysShowMask
        onBlur={e => !errorStatus && debouncedSendAnswer(e.target.value)}
        onChange={e => setuserInput(e.target.value)}
        defaultValue={data?.value}
        test-id={questionCode}
        ref={inputRef}
        w="full"
        maxW={maxW}
        isInvalid={isInvalid}
      >
        {inputProps => <Input {...inputProps} />}
      </InputMask>
      {errorStatus && (
        <ChakraText textStyle="tail.error" mt={2}>
          {errorMsg}
        </ChakraText>
      )}
    </>
  )
}

export default CommonWriteComponent
