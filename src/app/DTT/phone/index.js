import { useState, useEffect, useRef } from 'react'
import { Text, useClipboard, useToast, Input } from '@chakra-ui/react'
import debounce from 'lodash.debounce'

import phoneNumberFormatter from 'utils/formatters/phone-number'
import { useMobileValue } from 'utils/hooks'
import { getIsInvalid } from 'utils/functions'
import useErrorReducer from 'utils/reducers/ErrorReducer.js'
import { ACTIONS } from 'utils/reducers/action.js'

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
    /^(?:\+?(61))? ?(?:\((?=.*\)))?(0?[2-57-8])\)? ?(\d\d(?:[- ](?=\d{3})|(?!\d\d[- ]?\d[- ]))\d\d[- ]?\d[- ]?\d{3})$/,
  )
  const [errorStatus, setErrorStatus] = useState(false)
  const [userInput, setuserInput] = useState(data?.value)

  const { dispatch } = useErrorReducer()
  const inputRef = useRef()
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
      ? dispatch({ type: ACTIONS.SET_TO_TRUE, payload: 'phone' })
      : dispatch({ type: ACTIONS.SET_TO_FALSE, payload: 'phone' })
  }, [dispatch, isInvalid])

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
      {errorStatus && (
        <Text textStyle="tail.error" mt={2}>{`Please enter a valid phone number. `}</Text>
      )}
    </>
  )
}

const Phone = {
  Write,
  Read,
}

export default Phone
