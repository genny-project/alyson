import { Button, Input, InputGroup, InputLeftElement, Text } from '@chakra-ui/react'
import { useEffect, useState } from 'react'

import ABNLookup from './abn_lookup'
import { ACTIONS } from 'utils/contexts/ErrorReducer'
import { Read } from '../text'
import { getIsInvalid } from 'utils/functions'
import { useError } from 'utils/contexts/ErrorContext'
import { useMobileValue } from 'utils/hooks'

const Write = ({ questionCode, data, onSendAnswer, disabled, regexPattern, errorMessage }) => {
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
  const maxW = useMobileValue(['', '25vw'])

  return (
    <>
      <ABNLookup
        isOpen={isOpen}
        close={close}
        questionCode={questionCode}
        onSendAnswer={onSendAnswer}
        targetCode={data.baseEntityCode}
      />
      <InputGroup w={'100%'} maxW={maxW}>
        <InputLeftElement w="8rem" h={`46`}>
          <Button
            isDisabled={disabled}
            w="8rem"
            variant="outline"
            colorScheme="primary"
            onClick={open}
            h={`46`}
          >
            ABN Lookup
          </Button>
        </InputLeftElement>
        <Input
          id={questionCode}
          test-id={questionCode}
          pl="10rem"
          value={value}
          onChange={e => setValue(e.target.value)}
          onBlur={e => onSendAnswer(e.target.value)}
          w={`100%`}
          borderColor={'gray.700'}
          h="46"
          fontWeight={'medium'}
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
