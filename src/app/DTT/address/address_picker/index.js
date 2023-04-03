import { Box, HStack, Input, Text, VStack } from '@chakra-ui/react'
import { equals, not } from 'ramda'
import { useEffect, useRef, useState } from 'react'

import { faCheckCircle } from '@fortawesome/free-solid-svg-icons'
import { FontAwesomeIcon } from '@fortawesome/react-fontawesome'
import useStyles from 'app/DTT/inputStyles'
import MandatorySymbol from 'app/layouts/components/form/mandatory-symbol'
import { internmatch } from 'utils/constants'
import { useError } from 'utils/contexts/ErrorContext'
import { useIsFieldNotEmpty } from 'utils/contexts/IsFieldNotEmptyContext'
import { isNotStringifiedEmptyArray } from 'utils/functionals'
import useGetProductName from 'utils/helpers/get-product-name'
import isJson from 'utils/helpers/is-json'
import useProductColors from 'utils/productColors'
import makeAddressData from 'app/DTT/address/address_picker/make-address-data'
import debugOut from 'utils/debug-out'

const AddressPicker = ({
  onSendAnswer,
  data,
  questionCode,
  placeholderName,
  mandatory,
  errorMessage: errormsg,
  repeated = '',
  trailing,
}) => {
  const productName = useGetProductName()
  const realm = productName.toLowerCase()
  const isProductIM = equals(productName, internmatch)
  const labelRef = useRef()

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

  const { labelTextColor } = useProductColors()

  const onPlaceChange = () => {
    const place = autocomplete.current.getPlace()
    if (!place?.geometry) {
      console.error(
        'Invalid address selected, please choose one of the options from the suggestion!',
      )
      setIsInputValidated(false)
    } else {
      setIsInputValidated(true)
      setHasError(false)
      setuserInput(place?.formatted_address)
      onSendAnswer(makeAddressData(place ?? {}))
      dispatchFieldMessage({ payload: questionCode })
    }
  }

  const onChange = e => {
    setIsInputValidated(false)
    setHasError(true)
    setuserInput(e.target.value)
  }

  const onBlur = e => {
    e.target.value ? setIsFocused(true) : setIsFocused(false)
    // setuserInput(e.target.value)
    // onSendAnswer(e.target.value)
    // dispatchFieldMessage({ payload: questionCode })
  }

  useEffect(() => {
    userInput ? setIsFocused(true) : setIsFocused(false)
  }, [userInput])

  useEffect(() => {
    setuserInput(returnValue?.formatted_address || returnValue || '')
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
      debugOut.error(error)
      console.log(
        'There was an error connecting to the Google API services, please try again later!',
      )
    }
    // eslint-disable-next-line react-hooks/exhaustive-deps
  }, [])

  const hasValidData = userInput

  const { inputStyles, labelStyles } = useStyles(hasValidData, isFocused)

  return (
    <Box position={'relative'} mt={isFocused ? 6 : 0} transition="all 0.25s ease">
      <HStack
        ref={labelRef}
        paddingStart={6}
        {...labelStyles}
        h={'full'}
        top={isFocused ? `calc(-${labelRef?.current?.clientHeight}px + .5rem)` : 0}
      >
        {placeholderName && (
          <MandatorySymbol
            placeholderName={placeholderName}
            mandatory={mandatory}
            labelTextColor={isProductIM ? `${realm}.primary` : labelTextColor}
            realm={realm}
          />
        )}
        {(!failedValidation && fieldNotEmpty && not(hasError)) ||
        (!failedValidation &&
          userInput &&
          isNotStringifiedEmptyArray(userInput) &&
          not(hasError)) ? (
          <FontAwesomeIcon opacity="0.5" color="green" icon={faCheckCircle} />
        ) : null}
      </HStack>
      <HStack w="100%" justifyItems={'flex-end'}>
        <Input
          id={`${questionCode}${repeated}`}
          test-id={`${questionCode}${repeated}`}
          value={userInput || ''}
          ref={autoCompleteRef}
          onBlur={onBlur}
          onChange={onChange}
          onFocus={() => {
            setIsFocused(true)
          }}
          isInvalid={hasError}
          placeholder=""
          paddingBlock={3}
          paddingInline={5}
          {...inputStyles}
        />
        {!!trailing && trailing}
      </HStack>
      <VStack alignItems="start">
        {hasError && (
          <Text
            textStyle="product.errorText"
            color={isProductIM ? `${realm}.secondary` : 'red.500'}
          >
            {errorMessage}
          </Text>
        )}
      </VStack>
    </Box>
  )
}

export default AddressPicker
