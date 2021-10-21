import { Text as ChakraText, IconButton, Input, InputGroup, InputLeftAddon } from '@chakra-ui/react'
import { useEffect, useState } from 'react'

import { ACTIONS } from 'utils/contexts/ErrorReducer'
import { FontAwesomeIcon } from '@fortawesome/react-fontawesome'
import { faCoffee } from '@fortawesome/free-solid-svg-icons'
import { faLinkedin } from '@fortawesome/free-brands-svg-icons'
import { getIsInvalid } from 'utils/functions'
import { includes } from 'ramda'
import { useError } from 'utils/contexts/ErrorContext'
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
        <FontAwesomeIcon size="lg" icon={faCoffee} />
      </IconButton>
    </a>
  )
}

const Write = ({ questionCode, onSendAnswer, data, regexPattern }) => {
  const { dispatch } = useError()
  const [errorStatus, setErrorStatus] = useState(false)
  const [userInput, setuserInput] = useState(data?.value)

  const maxW = useMobileValue('', '25vw')

  const isInvalid = getIsInvalid(userInput)(RegExp(regexPattern))

  useEffect(() => {
    isInvalid === true ? setErrorStatus(true) : setErrorStatus(false)
  }, [isInvalid])

  useEffect(() => {
    isInvalid === true
      ? dispatch({ type: ACTIONS.SET_TO_TRUE, payload: questionCode })
      : dispatch({ type: ACTIONS.SET_TO_FALSE, payload: questionCode })
  }, [dispatch, isInvalid, questionCode])

  return (
    <>
      <InputGroup w="full" maxW={maxW}>
        <InputLeftAddon>
          <FontAwesomeIcon size="lg" icon={faLinkedin} />
        </InputLeftAddon>
        <Input
          test-id={questionCode}
          defaultValue={data?.value}
          onBlur={e => onSendAnswer(e.target.value)}
          onChange={e => setuserInput(e.target.value)}
        />
      </InputGroup>
      {errorStatus && (
        <ChakraText
          textStyle="tail.error"
          mt={2}
        >{`You can only valid social address.`}</ChakraText>
      )}
    </>
  )
}

const Social = {
  Read,
  Write,
}

export default Social
