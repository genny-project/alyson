import {
  Box,
  HStack,
  Input,
  Text,
  useClipboard,
  useToast,
  VStack,
  Text as ChakraText,
  Button,
} from '@chakra-ui/react'
import { useEffect, useState } from 'react'

import { ACTIONS } from 'utils/contexts/ErrorReducer'
import { FontAwesomeIcon } from '@fortawesome/react-fontawesome'
import { faCheckCircle } from '@fortawesome/free-solid-svg-icons'
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

const Write = ({
  questionCode,
  data,
  onSendAnswer,
  regexPattern,
  errorMessage,
  attributeCode,
  parentCode,
}) => {
  const [errorStatus, setErrorStatus] = useState(false)
  const [userInput, setuserInput] = useState(data?.value)
  const { dispatch } = useError()
  const { dispatchFieldMessage } = useIsFieldNotEmpty()
  const isInvalid = getIsInvalid(userInput)(RegExp(regexPattern))
  const maxW = useMobileValue(['', '25vw'])

  const fieldMessageObject = useSelector(selectFieldMessage)
  const fieldMessage = fieldMessageObject[`${parentCode}@${questionCode}`]
  let hasFieldMessage = isNotNullOrUndefinedOrEmpty(fieldMessage)
  let hasErrorMessage = isNotNullOrUndefinedOrEmpty(errorMessage)
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

  const onBlur = e => {
    !errorStatus && onSendAnswer(e.target.value)
    dispatchFieldMessage({ payload: questionCode })
  }

  useEffect(() => {
    isInvalid ? setErrorStatus(true) : setErrorStatus(false)
  }, [isInvalid])

  useEffect(() => {
    isInvalid
      ? dispatch({ type: ACTIONS.SET_TO_TRUE, payload: questionCode })
      : dispatch({ type: ACTIONS.SET_TO_FALSE, payload: questionCode })
  }, [dispatch, isInvalid, questionCode])

  useEffect(() => {
    setuserInput(data?.value || '')
  }, [data])

  const handleChange = event => setuserInput(event.target.value)

  return (
    <Box>
      <>
        <Input
          test-id={questionCode}
          id={questionCode}
          type="email"
          onBlur={onBlur}
          onChange={handleChange}
          isInvalid={isInvalid}
          value={userInput}
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
    </Box>
  )
}

const Read = ({ data }) => {
  const { onCopy } = useClipboard(data.value)
  const toast = useToast()

  if (!data?.value) return null

  const onClick = () => {
    onCopy()
    toast({
      status: 'success',
      duration: 1000,
      render: () => (
        <HStack
          paddingBlock={5}
          paddingInline={6}
          bg="success.100"
          borderWidth={'1px'}
          borderColor={'success.500'}
          borderRadius={'lg'}
        >
          <FontAwesomeIcon color="#00AFAB" icon={faCheckCircle} size="lg" />
          <Text color="text.light">{`${data?.value} copied!`}</Text>
        </HStack>
      ),
    })
  }
  return (
    <Text cursor="pointer" onClick={onClick}>
      {data?.value}
    </Text>
  )
}

const Email = {
  Write,
  Read,
}

export default Email
