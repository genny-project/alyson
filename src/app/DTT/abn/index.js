import { Button, Input, InputGroup, InputLeftElement, Text } from '@chakra-ui/react'
import { useEffect, useState } from 'react'

import ABNLookup from './abn_lookup'
import { ACTIONS } from 'utils/contexts/ErrorReducer'
import { Read } from '../text'
import { getIsInvalid } from 'utils/functions'
import { isEmpty } from 'ramda'
import { useError } from 'utils/contexts/ErrorContext'

const Write = ({
  questionCode,
  data,
  onSendAnswer,
  disabled,
  regexPattern,
  errorMessage,
  setSaving,
}) => {
  let regex
  const { dispatch } = useError()
  const [errorStatus, setErrorStatus] = useState(false)
  const [value, setValue] = useState(data?.value)
  const [isOpen, setIsOpen] = useState(false)

  useEffect(() => {
    setValue(data?.value)
  }, [data])

  try {
    regex = RegExp(regexPattern)
  } catch (err) {
    regex = undefined
  }

  const isInvalid = getIsInvalid(value)(regex)

  useEffect(() => {
    isInvalid ? setErrorStatus(true) : setErrorStatus(false)
  }, [isInvalid])

  useEffect(() => {
    isInvalid
      ? dispatch({ type: ACTIONS.SET_TO_TRUE, payload: questionCode })
      : dispatch({ type: ACTIONS.SET_TO_FALSE, payload: questionCode })
  }, [dispatch, isInvalid, questionCode])

  const open = () => setIsOpen(true)
  const close = () => setIsOpen(false)

  const onBlur = e => {
    !errorStatus && onSendAnswer(e.target.value)
    isEmpty(e.target.value) ? setSaving.off() : setSaving.on()
  }

  return (
    <>
      <ABNLookup
        isOpen={isOpen}
        close={close}
        questionCode={questionCode}
        onSendAnswer={onSendAnswer}
        targetCode={data.baseEntityCode}
      />
      <InputGroup w={'100%'} maxW="25vw">
        <InputLeftElement w="8rem">
          <Button
            isDisabled={disabled}
            w="8rem"
            variant="outline"
            colorScheme="primary"
            onClick={open}
          >
            ABN Lookup
          </Button>
        </InputLeftElement>
        <Input
          test-id={questionCode}
          pl="10rem"
          value={value}
          onChange={e => setValue(e.target.value)}
          onBlur={onBlur}
        />
      </InputGroup>
      {errorStatus && (
        <Text textStyle="tail.error" mt={2}>
          {errorMessage}
        </Text>
      )}
    </>
  )
}

const ABN = {
  Write,
  Read,
}

export default ABN
