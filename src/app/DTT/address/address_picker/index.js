import { useRef, useEffect } from 'react'
import { Input } from '@chakra-ui/react'

import makeAddressData from './make-address-data'
import { useMobileValue } from 'utils/hooks'

let autocomplete

const AddressPicker = ({ onSendAnswer, data, questionCode }) => {
  const autoCompleteRef = useRef(null)

  useEffect(() => {
    if (autoCompleteRef?.current) {
      autocomplete = new window.google.maps.places.Autocomplete(autoCompleteRef.current, {
        types: ['geocode'],
      })

      autocomplete.addListener('place_changed', () => {
        const place = autocomplete.getPlace()
        onSendAnswer(makeAddressData([place]))
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

  const maxW = useMobileValue(['', '25vw'])

  return (
    <Input
      test-id={questionCode}
      defaultValue={data?.value}
      ref={autoCompleteRef}
      w="full"
      maxW={maxW}
    />
  )
}

export default AddressPicker
