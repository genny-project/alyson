import { Text as ChakraText, Input } from '@chakra-ui/react'
import { useEffect, useRef, useState } from 'react'

import { ACTIONS } from 'utils/contexts/ErrorReducer'
import debounce from 'lodash.debounce'
import { getIsInvalid } from 'utils/functions'
import { useError } from 'utils/contexts/ErrorContext'
import { useMobileValue } from 'utils/hooks'

const CommonWriteComponent = ({ questionCode, data, onSendAnswer, regex, errorMsg, dtType }) => {
  const { dispatch } = useError()
  const [errorStatus, setErrorStatus] = useState(false)
  const [userInput, setuserInput] = useState(data?.value)

  if (dtType === 'DTT_TEXT') {
    regex = RegExp(/^[\w\d\s]{1,20}$/)
    errorMsg = 'Please enter a valid name.'
  }

  if (dtType === 'DTT_NAME') {
    regex = RegExp(/^[a-zA-Z]*$/)
  }

  if (dtType === 'DTT_DOUBLE') {
    regex = RegExp(/^(2[0-4]|1[0-9]|[1-9])$/)
    errorMsg = 'Log hours cannot exceed than 24.'
  }

  const testRegex = RegExp(regex)
  const inputRef = useRef()
  const isInvalid = getIsInvalid(userInput)(testRegex)

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
      <Input
        onBlur={e => !errorStatus && debouncedSendAnswer(e.target.value)}
        onChange={e => setuserInput(e.target.value)}
        defaultValue={data?.value}
        test-id={questionCode}
        ref={inputRef}
        w="full"
        maxW={maxW}
        isInvalid={isInvalid}
      />
      {errorStatus && (
        <ChakraText textStyle="tail.error" mt={2}>
          {errorMsg}
        </ChakraText>
      )}
    </>
  )
}

export default CommonWriteComponent
