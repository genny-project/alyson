import { Text as ChakraText, IconButton, Input, InputGroup, InputLeftAddon } from '@chakra-ui/react'
import { useEffect, useState } from 'react'

import { ACTIONS } from 'utils/contexts/ErrorReducer'
import { FontAwesomeIcon } from '@fortawesome/react-fontawesome'
import { faLinkedin } from '@fortawesome/free-brands-svg-icons'
import { getIsInvalid } from 'utils/functions'
import { includes } from 'ramda'
import { useError } from 'utils/contexts/ErrorContext'
import { useIsFieldNotEmpty } from 'utils/contexts/IsFieldNotEmptyContext'
import { useMobileValue } from 'utils/hooks'

const Read = ({ data, config = {} }) => {
  const attributeName = data?.attributeName

  if (!data?.value) return null

  const href = includes('http', data.value) ? data.value : `https://${data.value}`

  if (attributeName === 'LinkedIn URL') {
    return (
      <a href={href}>
        <FontAwesomeIcon
          size="lg"
          icon={faLinkedin}
          test-id={data?.baseEntityCode}
          {...config}
          isDisabled={!data?.value}
          color="#3182CE"
        />
      </a>
    )
  }

  return (
    <a href={href}>
      <IconButton test-id={data?.baseEntityCode} colorScheme="linkedin" isDisabled={!data?.value}>
        <FontAwesomeIcon size="lg" icon={faLinkedin} />
      </IconButton>
    </a>
  )
}

const Write = ({ questionCode, onSendAnswer, data, regexPattern, errorMessage }) => {
  const { dispatch } = useError()
  const [errorStatus, setErrorStatus] = useState(false)
  const [userInput, setuserInput] = useState(data?.value)
  const { dispatchFieldMessage } = useIsFieldNotEmpty()

  const maxW = useMobileValue(['', '25vw'])

  const isInvalid = getIsInvalid(userInput)(RegExp(regexPattern))

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
    <>
      <InputGroup maxW={maxW}>
        <InputLeftAddon>
          <FontAwesomeIcon size="lg" icon={faLinkedin} />
        </InputLeftAddon>
        <Input
          id={questionCode}
          test-id={questionCode}
          defaultValue={data?.value}
          onBlur={onBlur}
          onChange={e => setuserInput(e.target.value)}
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
      </InputGroup>
      {errorStatus && (
        <ChakraText textStyle="tail.error" mt={2}>
          {errorMessage}
        </ChakraText>
      )}
    </>
  )
}

const Social = {
  Read,
  Write,
}

export default Social
