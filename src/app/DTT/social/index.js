import {
  Text as ChakraText,
  IconButton,
  Input,
  InputGroup,
  InputLeftAddon,
  VStack,
} from '@chakra-ui/react'
import { equals, includes } from 'ramda'
import { useEffect, useState } from 'react'

import { ACTIONS } from 'utils/contexts/ErrorReducer'
import { FontAwesomeIcon } from '@fortawesome/react-fontawesome'
import { apiConfig } from 'config/get-api-config.js'
import { faLinkedin } from '@fortawesome/free-brands-svg-icons'
import { getIsInvalid } from 'utils/functions'
import { isNotNullOrUndefinedOrEmpty } from 'utils/helpers/is-null-or-undefined.js'
import { selectFieldMessage } from 'redux/app/selectors'
import { useError } from 'utils/contexts/ErrorContext'
import { useGetAttributeFromProjectBaseEntity } from 'app/BE/project-be'
import { useIsFieldNotEmpty } from 'utils/contexts/IsFieldNotEmptyContext'
import { useMobileValue } from 'utils/hooks'
import { useSelector } from 'react-redux'

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

const Write = ({
  questionCode,
  onSendAnswer,
  data,
  regexPattern,
  errorMessage,
  parentCode,
  placeholderName,
}) => {
  const { dispatch } = useError()
  const [errorStatus, setErrorStatus] = useState(false)
  const [userInput, setuserInput] = useState(data?.value)
  const { dispatchFieldMessage } = useIsFieldNotEmpty()

  const maxW = useMobileValue(['', '25vw'])
  const clientId = apiConfig?.clientId
  const iconColor = useGetAttributeFromProjectBaseEntity('PRI_COLOR')?.valueString

  const isInvalid = getIsInvalid(userInput)(RegExp(regexPattern))
  const fieldMessageObject = useSelector(selectFieldMessage)
  const fieldMessage = fieldMessageObject[`${parentCode}@${questionCode}`]
  let hasFieldMessage = isNotNullOrUndefinedOrEmpty(fieldMessage)
  let hasErrorMessage = isNotNullOrUndefinedOrEmpty(errorMessage)

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

  return equals(clientId)('lojing') ? (
    <>
      <InputGroup
        border="1px"
        borderColor={'product.gray'}
        borderRadius={4}
        overflow={'hidden'}
        _hover={{
          borderColor: 'product.secondary',
          boxShadow: 'lg',
        }}
        _focusVisible={{
          borderColor: 'product.secondary',
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
      >
        <InputLeftAddon h={'auto'} border={0} paddingInlineStart={6}>
          <FontAwesomeIcon size="lg" icon={faLinkedin} color={iconColor} />
        </InputLeftAddon>
        <Input
          id={questionCode}
          test-id={questionCode}
          defaultValue={data?.value}
          onBlur={onBlur}
          onChange={e => setuserInput(e.target.value)}
          w="full"
          h={'auto'}
          paddingBlock={3}
          paddingInlineEnd={6}
          paddingInlineStart={0}
          bg={'product.gray'}
          border={0}
          fontSize={'sm'}
          fontWeight={'medium'}
          color="product.darkGray"
          borderRadius={0}
          _focusVisible={{
            border: '0',
          }}
          _focus={{
            border: '0',
          }}
        />
      </InputGroup>
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
  ) : (
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
        <VStack alignItems="start">
          {(hasFieldMessage || hasErrorMessage) && (
            <ChakraText textStyle="tail.error" mt={2}>
              {hasFieldMessage ? fieldMessage : errorMessage}
            </ChakraText>
          )}
        </VStack>
      )}
    </>
  )
}

const Social = {
  Read,
  Write,
}

export default Social
