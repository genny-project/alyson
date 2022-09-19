import { useEffect, useRef } from 'react'

import { Input } from '@chakra-ui/react'
import makeAddressData from './make-address-data'
import { useIsFieldNotEmpty } from 'utils/contexts/IsFieldNotEmptyContext'
import { useMobileValue } from 'utils/hooks'

let autocomplete

const AddressPicker = ({ onSendAnswer, data, questionCode }) => {
  const autoCompleteRef = useRef(null)
  const { dispatchFieldMessage } = useIsFieldNotEmpty()

  useEffect(() => {
    if (autoCompleteRef?.current) {
      try {
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
      } catch (error) {
        console.error(error)
      }
    }

    // eslint-disable-next-line react-hooks/exhaustive-deps
  }, [])

  const onBlur = e => {
    onSendAnswer(e.target.value)
    dispatchFieldMessage({ payload: questionCode })
  }

  const maxW = useMobileValue(['', '25vw'])

  return (
    <Input
      id={questionCode}
      test-id={questionCode}
      defaultValue={data?.value}
      ref={autoCompleteRef}
      w="full"
      maxW={maxW}
      onBlur={onBlur}
    />
  )
}

export default AddressPicker
