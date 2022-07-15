import {
  Box,
  HStack,
  Input,
  Text,
  useClipboard,
  useToast,
  VStack,
  Text as ChakraText,
} from '@chakra-ui/react'
import { useEffect, useState } from 'react'

import { ACTIONS } from 'utils/contexts/ErrorReducer'
import { FontAwesomeIcon } from '@fortawesome/react-fontawesome'
import { faCheckCircle } from '@fortawesome/free-solid-svg-icons'
import { getIsInvalid } from 'utils/functions'
import { useError } from 'utils/contexts/ErrorContext'
import { useIsFieldNotEmpty } from 'utils/contexts/IsFieldNotEmptyContext'
import { useMobileValue } from 'utils/hooks'

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
  placeholderName,
  properties,
}) => {
  const [errorStatus, setErrorStatus] = useState(false)
  const [userInput, setUserInput] = useState(data?.value)

  const { dispatch } = useError()
  const { dispatchFieldMessage } = useIsFieldNotEmpty()
  const isInvalid = getIsInvalid(userInput)(RegExp(regexPattern))
  const maxW = useMobileValue(['', '25vw'])

  const fieldMessageObject = useSelector(selectFieldMessage)
  const fieldMessage = fieldMessageObject[`${parentCode}@${questionCode}`]
  let hasFieldMessage = isNotNullOrUndefinedOrEmpty(fieldMessage)
  let hasErrorMessage = isNotNullOrUndefinedOrEmpty(errorMessage)
  const fieldBgColor = properties.fieldBgColor
  const secondaryColor = properties.secondaryColor

  const onBlur = e => {
    !errorStatus && onSendAnswer(e.target.value)
    dispatchFieldMessage({ payload: questionCode })
  }

  useEffect(() => {
    setUserInput(data?.value)
  }, [data, setUserInput])

  useEffect(() => {
    isInvalid ? setErrorStatus(true) : setErrorStatus(false)
  }, [isInvalid, setErrorStatus])

  useEffect(() => {
    isInvalid
      ? dispatch({ type: ACTIONS.SET_TO_TRUE, payload: questionCode })
      : dispatch({ type: ACTIONS.SET_TO_FALSE, payload: questionCode })
  }, [dispatch, isInvalid, questionCode])

  const handleChange = event => setUserInput(event.target.value)

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
          paddingBlock={2}
          paddingInline={6}
          fontWeight={'medium'}
          borderColor={fieldBgColor}
          bg={fieldBgColor}
          placeholder={placeholderName}
          _hover={{
            borderColor: secondaryColor,
            boxShadow: 'lg',
          }}
          _focusVisible={{
            borderColor: secondaryColor,
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
