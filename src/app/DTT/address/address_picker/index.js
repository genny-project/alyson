import { useRef, useEffect } from 'react'
import { Input } from '@chakra-ui/react'
import makeAddressData from './make-address-data'

let autocomplete

const AddressPicker = ({ onSendAnswer, data }) => {
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
  }, [onSendAnswer])

  return <Input ref={autoCompleteRef} />
}

export default AddressPicker
