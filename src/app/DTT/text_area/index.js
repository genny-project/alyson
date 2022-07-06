import { Text, Textarea } from '@chakra-ui/react'
import { useEffect, useRef } from 'react'

import { ACTIONS } from 'utils/contexts/ErrorReducer'
import debounce from 'lodash.debounce'
import { getIsInvalid } from 'utils/functions'
import { useError } from 'utils/contexts/ErrorContext'
import { useIsFieldNotEmpty } from 'utils/contexts/IsFieldNotEmptyContext'
import { useMobileValue } from 'utils/hooks'
import useStateMounted from 'utils/helpers/use-state-mounted'

export const Read = ({ data, config = {} }) => {
  return <Textarea {...config}>{data?.value || config.defaultValue}</Textarea>
}

export const Write = ({ questionCode, data, onSendAnswer, regexPattern, errorMessage }) => {
  let regex
  const { dispatch } = useError()
  const [errorStatus, setErrorStatus] = useStateMounted(false)
  const [userInput, setuserInput] = useStateMounted(data?.value)
  const { dispatchFieldMessage } = useIsFieldNotEmpty()

  try {
    regex = RegExp(regexPattern)
  } catch (err) {
    console.error('There is an error with the regex', questionCode, err)
    regex = undefined
  }

  const inputRef = useRef()
  const isInvalid = getIsInvalid(userInput)(regex)

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

  return (
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
        <Text textStyle="tail.error" mt={2}>
          {errorMessage}
        </Text>
      )}
    </>
  )
}

const TextArea = {
  Write,
  Read,
}

export default TextArea
