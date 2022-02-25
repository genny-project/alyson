import { Text as ChakraText, Input } from '@chakra-ui/react'
import { useEffect, useRef, useState } from 'react'

import { ACTIONS } from 'utils/contexts/ErrorReducer'
import DetailViewTags from 'app/DTT/text/detailview_tags'
import debounce from 'lodash.debounce'
import { getIsInvalid } from 'utils/functions'
import { useError } from 'utils/contexts/ErrorContext'
import { useIsFieldNotEmpty } from 'utils/contexts/IsFieldNotEmptyContext'
import { useMobileValue } from 'utils/hooks'

export const Write = ({ questionCode, data, onSendAnswer, regexPattern, errorMessage }) => {
  let regex
  const { dispatch } = useError()
  const { dispatchFieldMessage } = useIsFieldNotEmpty()
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
  }, [isInvalid])

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

  return (
    <>
      <Input
        test-id={questionCode}
        id={questionCode}
        ref={inputRef}
        onBlur={onBlur}
        onChange={e => setuserInput(e.target.value)}
        defaultValue={data?.value}
        w="full"
        maxW={maxW}
        paddingBlock="14px"
        paddingInline="24px"
        isInvalid={isInvalid}
        h="46"
        fontWeight={'medium'}
        borderColor={'gray.700'}
        background={'light'}
        _hover={{
          borderColor: 'primary.500',
          boxShadow: 'lg',
        }}
        _focusVisible={{
          borderColor: 'primary.500',
          boxShadow: 'initial',
        }}
        _invalid={{
          borderColor: 'error.500',
          background: 'error.50',
          color: 'error.500',
        }}
        _disabled={{
          borderColor: 'gray.300',
          background: 'gray.100',
        }}
      />
      {errorStatus && (
        <ChakraText textStyle="tail.error" mt={2}>
          {errorMessage}
        </ChakraText>
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
