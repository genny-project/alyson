import { Text as ChakraText, Input, Button, VStack } from '@chakra-ui/react'
import { faCalendar, faCheckCircle } from '@fortawesome/free-solid-svg-icons'
import { useEffect, useRef } from 'react'

import { ACTIONS } from 'utils/contexts/ErrorReducer'
import DetailViewTags from 'app/DTT/text/detailview_tags'
import { FontAwesomeIcon } from '@fortawesome/react-fontawesome'
import debounce from 'lodash.debounce'
import { getIsInvalid } from 'utils/functions'
import { useError } from 'utils/contexts/ErrorContext'
import { useIsFieldNotEmpty } from 'utils/contexts/IsFieldNotEmptyContext'
import { useMobileValue } from 'utils/hooks'
import { useDispatch } from 'react-redux'
import { newCmd } from 'redux/app'
import { compose } from 'ramda'
import { useSelector } from 'react-redux'
import { selectFieldMessage } from 'redux/app/selectors'
import { isNotNullOrUndefinedOrEmpty } from 'utils/helpers/is-null-or-undefined.js'
import useStateMounted from 'utils/helpers/use-state-mounted'

export const Write = ({
  questionCode,
  data,
  onSendAnswer,
  regexPattern,
  errorMessage,
  attributeCode,
  parentCode,
}) => {
  let regex
  const { dispatch } = useError()
  const { dispatchFieldMessage } = useIsFieldNotEmpty()
  const [errorStatus, setErrorStatus] = useStateMounted(false)
  const [userInput, setuserInput] = useStateMounted(data?.value)

  const fieldMessageObject = useSelector(selectFieldMessage)
  const fieldMessage = fieldMessageObject[`${parentCode}@${questionCode}`]
  let hasFieldMessage = isNotNullOrUndefinedOrEmpty(fieldMessage)
  let hasErrorMessage = isNotNullOrUndefinedOrEmpty(errorMessage)

  try {
    regexPattern = regexPattern.replaceAll('\\\\', '\\')
    regex = RegExp(regexPattern)
  } catch (err) {
    console.error('There is an error with the regex', questionCode, err)
    regex = undefined
  }

  const inputRef = useRef()
  const isInvalid = getIsInvalid(userInput)(regex)
  const dispatchPushMessage = useDispatch()
  const onNewCmd = compose(dispatchPushMessage, newCmd)

  const handleDispatchMessage = () => {
    onNewCmd({
      cmd_type: 'FIELDMSG',
      code: parentCode,
      attributeCode,
      questionCode,
      message: {
        value: 'This replaced the error message with field message!',
      },
    })
  }

  const handleClearFieldMessage = () => {
    onNewCmd({
      cmd_type: 'FIELDMSG',
      code: parentCode,
      attributeCode,
      questionCode,
      message: {
        value: '',
      },
    })
  }

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

  useEffect(() => {
    isInvalid ? setErrorStatus(true) : setErrorStatus(false)
  }, [isInvalid, setErrorStatus])

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
        value={userInput || ''}
        isInvalid={isInvalid}
        w="full"
        maxW={maxW}
        paddingBlock={3}
        paddingInline={5}
        fontWeight={'medium'}
        borderColor={'gray.700'}
        _hover={{
          borderColor: 'green.500',
          boxShadow: 'lg',
        }}
        _focusVisible={{
          borderColor: 'green.500',
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
      {errorStatus && (
        <VStack alignItems="start">
          {(hasFieldMessage || hasErrorMessage) && (
            <ChakraText textStyle="tail.error" mt={2}>
              {hasFieldMessage ? fieldMessage : errorMessage}
            </ChakraText>
          )}
          {hasFieldMessage && (
            <Button onClick={handleClearFieldMessage}>{`Clear Field Message`}</Button>
          )}
          <Button onClick={handleDispatchMessage}>{`Dispatch Message`}</Button>
        </VStack>
      )}
    </>
  )
}

export const Read = ({ data, config = {}, hasIndicatorIcon }) => {
  const { detailViewTags } = config

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

  return <ChakraText {...config}>{data?.value || config.defaultValue}</ChakraText>
}

const Text = {
  Write,
  Read,
}

export default Text
