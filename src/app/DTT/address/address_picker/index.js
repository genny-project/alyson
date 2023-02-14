import { Box, HStack, Input, Text, useTheme, VStack } from '@chakra-ui/react'
import { equals, not } from 'ramda'
import { useEffect, useRef, useState } from 'react'

import { faCheckCircle } from '@fortawesome/free-solid-svg-icons'
import { FontAwesomeIcon } from '@fortawesome/react-fontawesome'
import { internmatch } from 'utils/constants'
import { useError } from 'utils/contexts/ErrorContext'
import { useIsFieldNotEmpty } from 'utils/contexts/IsFieldNotEmptyContext'
import { isNotStringifiedEmptyArray } from 'utils/functionals'
import useGetProductName from 'utils/helpers/get-product-name'
import isJson from 'utils/helpers/is-json'
import useProductColors from 'utils/productColors'

const AddressPicker = ({
  onSendAnswer,
  data,
  questionCode,
  placeholder,
  mandatory,
  errorMessage: errormsg,
}) => {
  const productName = useGetProductName()
  const realm = productName.toLowerCase()
  const isProductIM = equals(productName, internmatch)

  const theme = useTheme()
  const autoCompleteRef = useRef(null)
  const [userInput, setuserInput] = useState(null)
  const [isFocused, setIsFocused] = useState(false)
  const [isInputValidated, setIsInputValidated] = useState(true)
  const [hasError, setHasError] = useState(false)
  const { errorState } = useError()
  const { fieldState, dispatchFieldMessage } = useIsFieldNotEmpty()

  const autocomplete = useRef(null)

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
    const place = autocomplete.current.getPlace()
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
      if (autoCompleteRef?.current && !autocomplete?.current) {
        autocomplete.current = new window.google.maps.places.Autocomplete(autoCompleteRef.current, {
          types: ['geocode'],
        })

        autocomplete.current.addListener('place_changed', onPlaceChange)

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
            autocomplete.current.setBounds(circle.getBounds())
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
          <Text
            as="label"
            fontSize={'sm'}
            fontWeight={isProductIM ? `normal` : 'medium'}
            color={isProductIM ? `${realm}.primary` : labelTextColor}
          >
            {placeholder}
            {mandatory ? (
              <Text as="span" color={isProductIM ? `${realm}.secondary` : 'red.500'} ml={1}>
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
        h={'auto'}
        paddingBlock={3}
        paddingInline={5}
        fontWeight={isProductIM ? `normal` : 'medium'}
        fontSize={'sm'}
        color={isProductIM ? `${realm}.primary` : fieldTextColor}
        borderRadius={isProductIM ? `full` : borderRadius}
        borderColor={isProductIM ? `${realm}.primary` : fieldBorderColor}
        bg={isProductIM ? `${realm}.primaryLight` : fieldBackgroundColor}
        isInvalid={hasError}
        placeholder=""
        _hover={{
          borderColor: isProductIM ? `${realm}.primary` : fieldHoverBorderColor,
          boxShadow: 'lg',
        }}
        _focusVisible={{
          borderColor: isProductIM ? `${realm}.primary` : 'product.secondary',
          boxShadow: 'initial',
        }}
        _invalid={{
          background: isProductIM ? `${realm}.secondaryLight` : 'error.50',
          borderColor: isProductIM ? `${realm}.primary` : 'error.500',
          color: isProductIM ? `${realm}.primary` : 'error.500',
        }}
        _disabled={{
          borderColor: isProductIM ? `${realm}.primary` : 'gray.300',
          background: isProductIM ? `${realm}.primary` : 'gray.100',
          color: isProductIM ? `${realm}.primaryLight` : 'initial',
        }}
      />
      <VStack alignItems="start">
        {hasError && <Text textStyle="product.errorText">{errorMessage}</Text>}
      </VStack>
    </Box>
  )
}

export default AddressPicker
