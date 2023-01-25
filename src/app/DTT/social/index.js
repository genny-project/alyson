import {
  Box,
  Text as ChakraText,
  HStack,
  IconButton,
  Input,
  InputGroup,
  InputLeftAddon,
  useTheme,
} from '@chakra-ui/react'
import { useEffect, useState } from 'react'

import { ACTIONS } from 'utils/contexts/ErrorReducer'
import { FontAwesomeIcon } from '@fortawesome/react-fontawesome'
import { faCheckCircle, faGlobe } from '@fortawesome/free-solid-svg-icons'
import { faLinkedinIn } from '@fortawesome/free-brands-svg-icons'
import { getIsInvalid } from 'utils/functions'
import { includes, toLower } from 'ramda'
import { isNotNullOrUndefinedOrEmpty } from 'utils/helpers/is-null-or-undefined.js'
import { isNotStringifiedEmptyArray } from 'utils/functionals'
import { useError } from 'utils/contexts/ErrorContext'
import { useGetAttributeFromProjectBaseEntity } from 'app/BE/project-be'
import useGetFieldMessage from 'utils/fieldMessage'
import { useIsFieldNotEmpty } from 'utils/contexts/IsFieldNotEmptyContext'
import useProductColors from 'utils/productColors'
import ErrorDisplay from 'app/DTT/helpers/error-display'
import useClearFieldMessage from 'app/DTT/helpers/clear-field-message'

const Read = ({ data, config = {} }) => {
  const attributeName = data?.attributeName

  if (!data?.value) return null

  const href = includes('http', data.value) ? data.value : `https://${data.value}`

  if (includes('linkedin')(toLower(attributeName || ''))) {
    return (
      <a href={href}>
        <FontAwesomeIcon
          size="lg"
          icon={faLinkedinIn}
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
        <FontAwesomeIcon size="lg" icon={faGlobe} />
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
  attributeCode,
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

  const { hasFieldMessage, fieldMessage } = useGetFieldMessage(parentCode, questionCode)

  const { dispatch } = useError()
  const [errorStatus, setErrorStatus] = useState(false)
  const [userInput, setuserInput] = useState(data?.value)
  const [isFocused, setIsFocused] = useState(false)

  const { dispatchFieldMessage } = useIsFieldNotEmpty()

  const iconColor = useGetAttributeFromProjectBaseEntity('PRI_COLOR_SECONDARY')?.valueString

  const isInvalid = getIsInvalid(userInput)(RegExp(regexPattern))

  let hasErrorMessage = isNotNullOrUndefinedOrEmpty(errorMessage)

  const { errorState } = useError()
  const { fieldState } = useIsFieldNotEmpty()
  const handleClearFieldMessage = useClearFieldMessage(parentCode, attributeCode, questionCode)

  const failedValidation = errorState[questionCode]
  const fieldNotEmpty = fieldState[questionCode]
  const attributeName = data?.attributeName

  const onBlur = e => {
    e.target.value ? setIsFocused(true) : setIsFocused(false)
    !errorStatus && onSendAnswer(e.target.value)
    dispatchFieldMessage({ payload: questionCode })
    hasFieldMessage && handleClearFieldMessage()
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
            paddingInlineStart={4}
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
            {includes('linkedin')(toLower(attributeName || '')) ? (
              <FontAwesomeIcon size="lg" icon={faLinkedinIn} color={'inherit'} />
            ) : (
              <FontAwesomeIcon size="lg" icon={faGlobe} color={'inherit'} />
            )}
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
      <ErrorDisplay
        hasErrorMessage={hasErrorMessage}
        errorStatus={errorStatus}
        errorMessage={errorMessage}
        fieldMessage={fieldMessage}
        hasFieldMessage={hasFieldMessage}
      />
    </Box>
  )
}

const Social = {
  Read,
  Write,
}

export default Social
