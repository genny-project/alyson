import { Box, HStack, Input, Text, useTheme } from '@chakra-ui/react'
import { useEffect, useRef, useState } from 'react'

import { FontAwesomeIcon } from '@fortawesome/react-fontawesome'
import { compose } from 'ramda'
import dispatchBaseEntityUpdates from 'utils/helpers/dispatch-baseentity-updates'
import { faCheckCircle } from '@fortawesome/free-solid-svg-icons'
import { isNotStringifiedEmptyArray } from 'utils/functionals'
import makeAddressData from './make-address-data'
import { newMsg } from 'redux/app'
import { useDispatch } from 'react-redux'
import { useError } from 'utils/contexts/ErrorContext'
import { useIsFieldNotEmpty } from 'utils/contexts/IsFieldNotEmptyContext'

let autocomplete

const AddressPicker = ({
  onSendAnswer,
  data,
  questionCode,
  attributeCode,
  targetCode,
  placeholderName,
  mandatory,
}) => {
  const theme = useTheme()
  const autoCompleteRef = useRef(null)
  const [userInput, setuserInput] = useState(data?.value)
  const [isFocused, setIsFocused] = useState(false)
  const { dispatchFieldMessage } = useIsFieldNotEmpty()

  const { errorState } = useError()
  const { fieldState } = useIsFieldNotEmpty()

  const failedValidation = errorState[questionCode]
  const fieldNotEmpty = fieldState[questionCode]
  const dispatchBeInformation = useDispatch()
  const onNewMsg = compose(dispatchBeInformation, newMsg)

  useEffect(() => {
    data?.value ? setIsFocused(true) : setIsFocused(false)
    // eslint-disable-next-line react-hooks/exhaustive-deps
  }, [])

  useEffect(() => {
    if (autoCompleteRef?.current) {
      autocomplete = new window.google.maps.places.Autocomplete(autoCompleteRef.current, {
        types: ['geocode'],
      })

      autocomplete.addListener('place_changed', () => {
        const place = autocomplete.getPlace()
        onSendAnswer(makeAddressData([place]))
        dispatchFieldMessage({ payload: questionCode })
      })

      if (navigator.geolocation) {
        navigator.geolocation.getCurrentPosition(position => {
          const geolocation = {
            lat: position.coords.latitude,
            lng: position.coords.longitude,
          }
          const circle = new window.google.maps.Circle({
            center: geolocation,
            radius: position.coords.accuracy,
          })
          autocomplete.setBounds(circle.getBounds())
        })
      }
    }

    // eslint-disable-next-line react-hooks/exhaustive-deps
  }, [])

  const onBlur = e => {
    e.target.value ? setIsFocused(true) : setIsFocused(false)
    setuserInput(e.target.value)
    onSendAnswer(e.target.value)
    dispatchFieldMessage({ payload: questionCode })
    dispatchBaseEntityUpdates(attributeCode, targetCode, userInput)(onNewMsg)
  }

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
          <Text as="label" fontSize={'sm'} fontWeight={'medium'} color={'gray.600'}>
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
        (!failedValidation && userInput && isNotStringifiedEmptyArray(userInput)) ? (
          <FontAwesomeIcon opacity="0.5" color="green" icon={faCheckCircle} />
        ) : null}
      </HStack>

      <Input
        id={questionCode}
        test-id={questionCode}
        defaultValue={data?.value}
        ref={autoCompleteRef}
        onBlur={onBlur}
        onFocus={() => {
          setIsFocused(true)
        }}
        w="full"
        paddingBlock={3}
        paddingInline={5}
        fontWeight={'medium'}
        fontSize={'sm'}
        borderRadius={'calc(0.25rem - 1px)'}
        borderColor={'product.gray'}
        bg={'product.gray'}
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
      />
    </Box>
  )
}

export default AddressPicker
