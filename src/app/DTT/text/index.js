import { useState, useEffect, useRef } from 'react'
import { Input, Text as ChakraText } from '@chakra-ui/react'
import debounce from 'lodash.debounce'

import { useMobileValue } from 'utils/hooks'
import DetailViewTags from 'app/DTT/text/detailview_tags'
import { getIsInvalid } from 'utils/functions'
import { useError } from 'utils/contexts/ErrorContext'
import { ACTIONS } from 'utils/contexts/ErrorReducer'

export const Write = ({ questionCode, data, onSendAnswer, regexPattern }) => {
  let regex
  const { dispatch } = useError()
  const [errorStatus, setErrorStatus] = useState(false)
  const [userInput, setuserInput] = useState(data?.value)

  try {
    regex = RegExp(regexPattern)
  } catch (err) {
    console.error('There is an error with the regex', questionCode, err)
    regex = undefined
  }

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
        <ChakraText textStyle="tail.error" mt={2}>{`You can only enter alphabets.`}</ChakraText>
      )}
    </>
  )
}

export const Read = ({ data, config = {} }) => {
  const { detailViewTags } = config

  if (detailViewTags) {
    return <DetailViewTags data={data} />
  }

  return (
    <ChakraText noOfLines={3} {...config}>
      {data?.value || config.defaultValue}
    </ChakraText>
  )
}

const Text = {
  Write,
  Read,
}

export default Text
