import {
  Box,
  Text as ChakraText,
  HStack,
  IconButton,
  Input,
  InputGroup,
  InputLeftAddon,
  VStack,
  useTheme,
} from '@chakra-ui/react'
import { includes } from 'ramda'
import { useSelector } from 'react-redux'
import { useEffect, useState } from 'react'

import { ACTIONS } from 'utils/contexts/ErrorReducer'
import { FontAwesomeIcon } from '@fortawesome/react-fontawesome'
import { faCheckCircle } from '@fortawesome/free-solid-svg-icons'
import { faLinkedin } from '@fortawesome/free-brands-svg-icons'
import { getIsInvalid } from 'utils/functions'
import { isNotNullOrUndefinedOrEmpty } from 'utils/helpers/is-null-or-undefined.js'
import { isNotStringifiedEmptyArray } from 'utils/functionals'
import { selectFieldMessage } from 'redux/app/selectors'
import { useError } from 'utils/contexts/ErrorContext'
import { useGetAttributeFromProjectBaseEntity } from 'app/BE/project-be'
import { useIsFieldNotEmpty } from 'utils/contexts/IsFieldNotEmptyContext'
import useProductColors from 'utils/productColors'

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
  mandatory,
}) => {
  const theme = useTheme()

  const {
    fieldBackgroundColor,
    fieldBorderColor,
    fieldHoverBorderColor,
    fieldTextColor,
    labelTextColor,
    borderRadius,
  } = useProductColors()

  const { dispatch } = useError()
  const [errorStatus, setErrorStatus] = useState(false)
  const [userInput, setuserInput] = useState(data?.value)
  const [isFocused, setIsFocused] = useState(false)

  const { dispatchFieldMessage } = useIsFieldNotEmpty()

  const iconColor = useGetAttributeFromProjectBaseEntity('PRI_COLOR_SECONDARY')?.valueString

  const isInvalid = getIsInvalid(userInput)(RegExp(regexPattern))
  const fieldMessageObject = useSelector(selectFieldMessage)
  const fieldMessage = fieldMessageObject[`${parentCode}@${questionCode}`]
  let hasFieldMessage = isNotNullOrUndefinedOrEmpty(fieldMessage)
  let hasErrorMessage = isNotNullOrUndefinedOrEmpty(errorMessage)

  const { errorState } = useError()
  const { fieldState } = useIsFieldNotEmpty()

  const failedValidation = errorState[questionCode]
  const fieldNotEmpty = fieldState[questionCode]

  const onBlur = e => {
    e.target.value ? setIsFocused(true) : setIsFocused(false)
    !errorStatus && onSendAnswer(e.target.value)
    dispatchFieldMessage({ payload: questionCode })
  }

  useEffect(() => {
    userInput ? setIsFocused(true) : setIsFocused(false)
  }, [userInput])

  useEffect(() => {
    isInvalid ? setErrorStatus(true) : setErrorStatus(false)
  }, [isInvalid])

  useEffect(() => {
    isInvalid
      ? dispatch({ type: ACTIONS.SET_TO_TRUE, payload: questionCode })
      : dispatch({ type: ACTIONS.SET_TO_FALSE, payload: questionCode })
  }, [dispatch, isInvalid, questionCode])

  return (
    <Box position={'relative'} mt={isFocused ? 6 : 0} transition="all 0.25s ease">
      <HStack
        position={'absolute'}
        zIndex={theme.zIndices.docked}
        top={isFocused ? '-1.5rem' : 3}
        left={0}
        paddingStart={isFocused ? 6 : 12}
        w="full"
        justifyContent={'space-between'}
        pointerEvents={'none'}
        transition="all 0.25s ease"
      >
        {placeholderName && (
          <ChakraText as="label" fontSize={'sm'} fontWeight={'medium'} color={labelTextColor}>
            {placeholderName}
            {mandatory ? (
              <ChakraText as="span" color={'red.500'} ml={1}>
                *
              </ChakraText>
            ) : (
              <></>
            )}
          </ChakraText>
        )}
        {(!failedValidation && fieldNotEmpty) ||
        (!failedValidation && userInput && isNotStringifiedEmptyArray(userInput)) ? (
          <FontAwesomeIcon opacity="0.5" color="green" icon={faCheckCircle} />
        ) : null}
      </HStack>

      <HStack justifyContent={'space-between'}>
        <InputGroup
          bg={fieldBackgroundColor}
          borderRadius={borderRadius}
          borderWidth="1px"
          borderStyle="solid"
          borderColor={fieldBorderColor}
          overflow={'hidden'}
          onClick={() => setIsFocused(true)}
          role="group"
          _hover={{
            borderColor: fieldHoverBorderColor,
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
            color={isFocused ? iconColor : 'gray.600'}
            _groupHover={{
              color: iconColor,
            }}
            _groupfocusvisible={{
              color: iconColor,
            }}
            _groupfocuswithin={{
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
            color={fieldTextColor}
            _focusVisible={{
              border: '0',
            }}
            _focus={{
              border: '0',
            }}
          />
        </InputGroup>
      </HStack>
      {errorStatus && (
        <VStack alignItems="start">
          {(hasFieldMessage || hasErrorMessage) && (
            <ChakraText textStyle="product.errorText">
              {hasFieldMessage ? fieldMessage : errorMessage}
            </ChakraText>
          )}
        </VStack>
      )}
    </Box>
  )
}

const Social = {
  Read,
  Write,
}

export default Social
