import { useState, useEffect, useRef } from 'react'
import { Text, useClipboard, useToast, Input } from '@chakra-ui/react'
import phoneNumberFormatter from 'utils/formatters/phone-number'
import { getIsInvalid } from 'utils/functions'
import { useError } from 'utils/contexts/ErrorContext'
import { ACTIONS } from 'utils/contexts/ErrorReducer'
import debounce from 'lodash.debounce'
import { useMobileValue } from 'utils/hooks'

const Read = ({ data, config }) => {
  const { onCopy } = useClipboard(data.value)
  const toast = useToast()

  if (!data?.value) return null

  const onClick = () => {
    onCopy()
    toast({
      title: `${data?.value} copied!`,
      status: 'success',
      duration: 1000,
    })
  }
  return (
    <Text cursor="pointer" w="10rem" onClick={onClick} {...config}>
      {phoneNumberFormatter(data.value)}
    </Text>
  )
}

export const Write = ({ questionCode, data, onSendAnswer, regexPattern }) => {
  // eslint-disable-next-line no-useless-escape
  const phoneRegex = RegExp(
    /^\+((?:9[679]|8[035789]|6[789]|5[90]|42|3[578]|2[1-689])|9[0-58]|8[1246]|6[0-6]|5[1-8]|4[013-9]|3[0-469]|2[70]|7|1)(?:\W*\d){0,13}\d$/,
  )
  const inputRef = useRef()

  const { dispatch } = useError()
  const [errorStatus, setErrorStatus] = useState(false)
  const [userInput, setuserInput] = useState(data?.value)

  const isInvalid = getIsInvalid(userInput)(phoneRegex)

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
        test-id={questionCode}
        ref={inputRef}
        onBlur={e => !errorStatus && debouncedSendAnswer(e.target.value)}
        onChange={e => setuserInput(e.target.value)}
        defaultValue={data?.value}
        w="full"
        maxW={maxW}
        isInvalid={isInvalid}
      />
      {errorStatus && <Text textStyle="tail.error" mt={2}>{`You can only enter numbers.`}</Text>}
    </>
  )
}

const Phone = {
  Write,
  Read,
}

export default Phone
