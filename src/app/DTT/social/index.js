import {
  Text as ChakraText,
  IconButton,
  Input,
  InputGroup,
  InputLeftAddon,
  VStack,
} from '@chakra-ui/react'
import { useEffect, useState } from 'react'

import { ACTIONS } from 'utils/contexts/ErrorReducer'
import { FontAwesomeIcon } from '@fortawesome/react-fontawesome'
import { faLinkedin } from '@fortawesome/free-brands-svg-icons'
import { getIsInvalid } from 'utils/functions'
import { includes } from 'ramda'
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

  const iconColor = useGetAttributeFromProjectBaseEntity('PRI_COLOR')?.valueString

  const isInvalid = getIsInvalid(userInput)(RegExp(regexPattern))
  const fieldMessageObject = useSelector(selectFieldMessage)
  const fieldMessage = fieldMessageObject[`${parentCode}@${questionCode}`]
  let hasFieldMessage = isNotNullOrUndefinedOrEmpty(fieldMessage)
  let hasErrorMessage = isNotNullOrUndefinedOrEmpty(errorMessage)

  const maxW = useMobileValue(['', '30vw'])

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

  console.log(data?.value)

  return (
    <>
      <InputGroup
        bg={'product.gray'}
        borderRadius={'calc(0.25rem - 1px)'}
        borderWidth="1px"
        borderStyle="solid"
        borderColor={'product.gray'}
        overflow={'hidden'}
        role="group"
        maxW={maxW}
        _hover={{
          borderColor: 'product.gray',
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
        _focusWithin={{
          borderColor: 'product.secondary',
          boxShadow: 'initial',
        }}
      >
        <InputLeftAddon
          h={'auto'}
          border={0}
          borderRadius={0}
          paddingInlineStart={6}
          color={userInput ? iconColor : 'gray.600'}
          _groupHover={{
            color: iconColor,
          }}
          _groupFocusVisible={{
            color: iconColor,
          }}
          _groupFocusWithin={{
            color: iconColor,
          }}
        >
          <FontAwesomeIcon size="lg" icon={faLinkedin} color={'inherit'} />
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
          border={0}
          fontSize={'sm'}
          fontWeight={'medium'}
          color="product.darkGray"
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
  )
}

const Social = {
  Read,
  Write,
}

export default Social
