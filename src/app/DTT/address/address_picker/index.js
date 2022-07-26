import { HStack, Input } from '@chakra-ui/react'
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
import { useMobileValue } from 'utils/hooks'

let autocomplete

const AddressPicker = ({ onSendAnswer, data, questionCode, attributeCode, targetCode }) => {
  const autoCompleteRef = useRef(null)
  const [userInput, setuserInput] = useState(data?.value)
  const { dispatchFieldMessage } = useIsFieldNotEmpty()

  const { errorState } = useError()
  const { fieldState } = useIsFieldNotEmpty()

  const failedValidation = errorState[questionCode]
  const fieldNotEmpty = fieldState[questionCode]
  const dispatchBeInformation = useDispatch()
  const onNewMsg = compose(dispatchBeInformation, newMsg)

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
    setuserInput(e.target.value)
    onSendAnswer(e.target.value)
    dispatchFieldMessage({ payload: questionCode })
    dispatchBaseEntityUpdates(attributeCode, targetCode, userInput)(onNewMsg)
  }

  const maxW = useMobileValue(['', '25vw'])

  return (
    <HStack>
      <Input
        id={questionCode}
        test-id={questionCode}
        defaultValue={data?.value}
        ref={autoCompleteRef}
        onBlur={onBlur}
        w="full"
        maxW={maxW}
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

      {(!failedValidation && fieldNotEmpty) ||
      (!failedValidation && userInput && isNotStringifiedEmptyArray(userInput)) ? (
        <FontAwesomeIcon opacity="0.5" color="green" icon={faCheckCircle} />
      ) : null}
    </HStack>
  )
}

export default AddressPicker
