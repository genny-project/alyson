import {
  Box,
  Button,
  HStack,
  Input,
  InputGroup,
  InputLeftElement,
  Text,
  VStack,
  useTheme,
} from '@chakra-ui/react'
import { compose, equals } from 'ramda'
import { useDispatch, useSelector } from 'react-redux'
import { useEffect, useState } from 'react'

import ABNLookup from './abn_lookup'
import { ACTIONS } from 'utils/contexts/ErrorReducer'
import { FontAwesomeIcon } from '@fortawesome/react-fontawesome'
import { Read } from '../text'
import dispatchBaseEntityUpdates from 'utils/helpers/dispatch-baseentity-updates'
import { faCheckCircle } from '@fortawesome/free-solid-svg-icons'
import { getIsInvalid } from 'utils/functions'
import { isNotNullOrUndefinedOrEmpty } from 'utils/helpers/is-null-or-undefined.js'
import { isNotStringifiedEmptyArray } from 'utils/functionals'
import { newMsg } from 'redux/app'
import { selectFieldMessage } from 'redux/app/selectors'
import { useError } from 'utils/contexts/ErrorContext'
import { useIsFieldNotEmpty } from 'utils/contexts/IsFieldNotEmptyContext'

const Write = ({
  questionCode,
  data,
  onSendAnswer,
  disabled,
  regexPattern,
  errorMessage,
  parentCode,
  placeholderName,
  attributeCode,
  targetCode,
  mandatory,
  clientId,
}) => {
  let regex
  const theme = useTheme()
  const { dispatch } = useError()
  const [errorStatus, setErrorStatus] = useState(false)
  const [value, setValue] = useState(data?.value)
  const [isOpen, setIsOpen] = useState(false)
  const [isFocused, setIsFocused] = useState(false)

  const fieldMessageObject = useSelector(selectFieldMessage)
  const fieldMessage = fieldMessageObject[`${parentCode}@${questionCode}`]
  let hasFieldMessage = isNotNullOrUndefinedOrEmpty(fieldMessage)
  let hasErrorMessage = isNotNullOrUndefinedOrEmpty(errorMessage)
  const { errorState } = useError()
  const { fieldState } = useIsFieldNotEmpty()

  const failedValidation = errorState[questionCode]
  const fieldNotEmpty = fieldState[questionCode]
  const dispatchBeInformation = useDispatch()
  const onNewMsg = compose(dispatchBeInformation, newMsg)

  const fieldBackgroundColor = equals(clientId)('lojing')
    ? 'product.gray'
    : theme.colors.background.light
  const fieldBorderColor = equals(clientId)('lojing') ? 'product.gray' : theme.colors.gray['600']
  const fieldHoverBorderColor = equals(clientId)('lojing') ? 'product.gray' : 'product.secondary'
  const fieldTextColor = 'product.gray700'

  const labelTextColor = equals(clientId)('lojing') ? 'gray.600' : 'product.gray700'
  const borderRadius = equals(clientId)('lojing') ? 'calc(0.25rem - 1px)' : '0.5rem'

  useEffect(() => {
    setValue(data?.value)
  }, [data])

  useEffect(() => {
    data?.value ? setIsFocused(true) : setIsFocused(false)
    // eslint-disable-next-line react-hooks/exhaustive-deps
  }, [])

  try {
    regex = RegExp(regexPattern)
  } catch (err) {
    regex = undefined
  }

  const isInvalid = getIsInvalid(value)(regex)

  const handleOnBlur = e => {
    e.target.value ? setIsFocused(true) : setIsFocused(false)
    onSendAnswer(e.target.value)
    dispatchBaseEntityUpdates(attributeCode, targetCode, value)(onNewMsg)
  }

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

  return (
    <Box position={'relative'} mt={isFocused ? 6 : 0} transition="all 0.25s ease">
      <HStack
        position={'absolute'}
        zIndex={theme.zIndices.docked}
        top={isFocused ? '-1.5rem' : 3}
        left={0}
        paddingStart={6}
        w="full"
        justifyContent={'space-between'}
        pointerEvents={'none'}
        transition="all 0.25s ease"
      >
        {placeholderName && (
          <Text as="label" fontSize={'sm'} fontWeight={'medium'} color={labelTextColor}>
            {placeholderName}
            {mandatory ? (
              <Text as="span" color={'red.500'} ml={1}>
                *
              </Text>
            ) : (
              <></>
            )}
          </Text>
        )}
        {(!failedValidation && fieldNotEmpty) ||
        (!failedValidation && value && isNotStringifiedEmptyArray(value)) ? (
          <FontAwesomeIcon opacity="0.5" color="green" icon={faCheckCircle} />
        ) : null}
      </HStack>

      <ABNLookup
        isOpen={isOpen}
        close={close}
        questionCode={questionCode}
        onSendAnswer={onSendAnswer}
        targetCode={data.baseEntityCode}
      />

      <InputGroup w={'100%'}>
        <InputLeftElement w="8rem" h={`40px`}>
          <Button
            isDisabled={disabled}
            w="8rem"
            variant="outline"
            colorScheme="primary"
            onClick={open}
            h={`40px`}
          >
            ABN Lookup
          </Button>
        </InputLeftElement>
        <Input
          id={questionCode}
          test-id={questionCode}
          placeholder={placeholderName}
          value={value}
          onFocus={() => {
            setIsFocused(true)
          }}
          onChange={e => setValue(e.target.value)}
          onBlur={handleOnBlur}
          w="full"
          paddingBlock={3}
          paddingInlineStart={'9rem'}
          paddingInlineEnd={6}
          borderRadius={borderRadius}
          borderColor={fieldBorderColor}
          bg={fieldBackgroundColor}
          fontSize={'sm'}
          fontWeight={'medium'}
          color={fieldTextColor}
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
        />
      </InputGroup>

      {errorStatus && (
        <VStack alignItems="start">
          {(hasFieldMessage || hasErrorMessage) && (
            <Text textStyle="product.errorText">
              {hasFieldMessage ? fieldMessage : errorMessage}
            </Text>
          )}
        </VStack>
      )}
    </Box>
  )
}

const ABN = {
  Write,
  Read,
}

export default ABN
