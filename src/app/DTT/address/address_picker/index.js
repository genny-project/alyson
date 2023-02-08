import { Box, HStack, Input, Text, useTheme, VStack } from '@chakra-ui/react'
import { useState, useEffect, useRef } from 'react'
import { FontAwesomeIcon } from '@fortawesome/react-fontawesome'
import { faCheckCircle } from '@fortawesome/free-solid-svg-icons'
import { not } from 'ramda'

import { isNotStringifiedEmptyArray } from 'utils/functionals'
import { useError } from 'utils/contexts/ErrorContext'
import { useIsFieldNotEmpty } from 'utils/contexts/IsFieldNotEmptyContext'
import useProductColors from 'utils/productColors'
import isJson from 'utils/helpers/is-json'

let autocomplete

const AddressPicker = ({
  onSendAnswer,
  data,
  questionCode,
  placeholder,
  mandatory,
  errorMessage: errormsg,
}) => {
  const theme = useTheme()
  const autoCompleteRef = useRef(null)
  const [userInput, setuserInput] = useState(null)
  const [isFocused, setIsFocused] = useState(false)
  const [isInputValidated, setIsInputValidated] = useState(true)
  const [hasError, setHasError] = useState(false)
  const { errorState } = useError()
  const { fieldState, dispatchFieldMessage } = useIsFieldNotEmpty()

  const failedValidation = errorState[questionCode]
  const fieldNotEmpty = fieldState[questionCode]

  const dataValue = data?.value

  let errorMessage = errormsg || `Please choose one of the options from the suggestion list`

  const getReturnValue = dataValue => {
    const isValueJson = isJson(dataValue)
    const parsedDataValueObject = isValueJson ? JSON.parse(dataValue) : undefined
    const parsedDataValue = parsedDataValueObject?.full_address
    if (isValueJson) return parsedDataValue
    return dataValue
  }

  const returnValue = getReturnValue(dataValue)

  const {
    fieldBackgroundColor,
    fieldBorderColor,
    fieldHoverBorderColor,
    fieldTextColor,
    labelTextColor,
    borderRadius,
  } = useProductColors()

  const onPlaceChange = () => {
    const place = autocomplete.getPlace()
    const placeGeometry = place?.geometry
    if (!place?.geometry) {
      console.error(
        'Invalid address selected, please choose one of the options from the suggestion!',
      )
      setIsInputValidated(false)
    }

    placeGeometry && setIsInputValidated(true)
  }

  const onChange = () => {
    setIsInputValidated(false)
    setHasError(true)
  }

  const onBlur = e => {
    e.target.value ? setIsFocused(true) : setIsFocused(false)
    setuserInput(e.target.value)
    onSendAnswer(e.target.value)
    dispatchFieldMessage({ payload: questionCode })
  }

  useEffect(() => {
    userInput ? setIsFocused(true) : setIsFocused(false)
  }, [userInput])

  useEffect(() => {
    setuserInput(returnValue)
  }, [returnValue])

  useEffect(() => {
    !!userInput && not(isInputValidated) ? setHasError(true) : setHasError(false)
  }, [userInput, isInputValidated])

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
        {(!failedValidation && fieldNotEmpty && not(hasError)) ||
        (!failedValidation &&
          userInput &&
          isNotStringifiedEmptyArray(userInput) &&
          not(hasError)) ? (
          <FontAwesomeIcon opacity="0.5" color="green" icon={faCheckCircle} />
        ) : null}
      </HStack>

      <Input
        id={questionCode}
        test-id={questionCode}
        defaultValue={userInput}
        ref={autoCompleteRef}
        onBlur={onBlur}
        onChange={onChange}
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
        isInvalid={hasError}
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
      <VStack alignItems="start">
        {hasError && <Text textStyle="product.errorText">{errorMessage}</Text>}
      </VStack>
    </Box>
  )
}

export default AddressPicker
