import { Box, HStack, Input, Text, useTheme } from '@chakra-ui/react'
import { useEffect, useRef, useState } from 'react'

import { FontAwesomeIcon } from '@fortawesome/react-fontawesome'
import { faCheckCircle } from '@fortawesome/free-solid-svg-icons'
import { isNotStringifiedEmptyArray } from 'utils/functionals'
import { useError } from 'utils/contexts/ErrorContext'
import { useIsFieldNotEmpty } from 'utils/contexts/IsFieldNotEmptyContext'
import useProductColors from 'utils/productColors'

let autocomplete

const AddressPicker = ({ onSendAnswer, data, questionCode, placeholder, mandatory }) => {
  const theme = useTheme()
  const autoCompleteRef = useRef(null)
  const [userInput, setuserInput] = useState(null)
  const [isFocused, setIsFocused] = useState(false)
  const { dispatchFieldMessage } = useIsFieldNotEmpty()

  const { errorState } = useError()
  const { fieldState } = useIsFieldNotEmpty()

  const failedValidation = errorState[questionCode]
  const fieldNotEmpty = fieldState[questionCode]

  const {
    fieldBackgroundColor,
    fieldBorderColor,
    fieldHoverBorderColor,
    fieldTextColor,
    labelTextColor,
    borderRadius,
  } = useProductColors()

  useEffect(() => {
    userInput ? setIsFocused(true) : setIsFocused(false)
  }, [userInput])

  useEffect(() => {
    setuserInput(data?.value)
  }, [data])

  const onPlaceChange = () => {
    const place = autocomplete.getPlace()
    if (!place.geometry) {
      console.error('Invalid address selected')
    }
  }

  useEffect(() => {
    try {
      if (autoCompleteRef?.current) {
        autocomplete = new window.google.maps.places.Autocomplete(autoCompleteRef.current, {
          types: ['geocode'],
        })

        autocomplete.addListener('place_changed', onPlaceChange)

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
    } catch (error) {
      console.log(
        'There was an error connecting to the Google API services, please try again later!',
      )
    }
    // eslint-disable-next-line react-hooks/exhaustive-deps
  }, [])

  const onBlur = e => {
    e.target.value ? setIsFocused(true) : setIsFocused(false)
    setuserInput(e.target.value)
    onSendAnswer(e.target.value)
    dispatchFieldMessage({ payload: questionCode })
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
        {placeholder && (
          <Text as="label" fontSize={'sm'} fontWeight={'medium'} color={labelTextColor}>
            {placeholder}
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
        defaultValue={userInput}
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
        color={fieldTextColor}
        borderRadius={borderRadius}
        borderColor={fieldBorderColor}
        bg={fieldBackgroundColor}
        placeholder=""
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
    </Box>
  )
}

export default AddressPicker
