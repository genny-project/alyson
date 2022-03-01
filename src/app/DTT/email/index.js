import { Box, Input, Text, useClipboard, useToast } from '@chakra-ui/react'
import { useEffect, useState } from 'react'

import { ACTIONS } from 'utils/contexts/ErrorReducer'
import Duplicates from './Duplicates'
import { getIsInvalid } from 'utils/functions'
import { useError } from 'utils/contexts/ErrorContext'
import { useIsFieldNotEmpty } from 'utils/contexts/IsFieldNotEmptyContext'
import { useMobileValue } from 'utils/hooks'

const Write = ({ questionCode, data, onSendAnswer, regexPattern, errorMessage }) => {
  const [errorStatus, setErrorStatus] = useState(false)
  const [userInput, setuserInput] = useState(data?.value)
  const { dispatch } = useError()
  const { dispatchFieldMessage } = useIsFieldNotEmpty()
  const isInvalid = getIsInvalid(userInput)(RegExp(regexPattern))
  const maxW = useMobileValue(['', '25vw'])

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

  return (
    <Box>
      <>
        <Input
          test-id={questionCode}
          id={questionCode}
          defaultValue={data?.value}
          type="email"
          onBlur={onBlur}
          onChange={e => setuserInput(e.target.value)}
          isInvalid={isInvalid}
          w="full"
          maxW={maxW}
          paddingBlock={3}
          paddingInline={5}
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
          <Text textStyle="tail.error" mt={2}>
            {errorMessage}
          </Text>
        )}
        <Duplicates email={data?.value} sourceCode={data.baseEntityCode} />
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
      title: `${data?.value} copied!`,
      status: 'success',
      duration: 1000,
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
