import { useEffect, useRef, useState } from 'react'
import { isEmpty, map } from 'ramda'
import { Input } from '@chakra-ui/react'
import initialiseMap from './helpers/initialise-map'
import setAddressSuggestions from './helpers/set-address-suggestions'

const AddressPicker = ({ onSendAnswer, data }) => {
  const inputRef = useRef(null)
  const [searchAddress, setSearchAddress] = useState('')
  const [allOptions, setAllOptions] = useState([])
  const [showSuggestiongs, setShowSuggestions] = useState(true)

  const handleOptionClick = description => {
    setSearchAddress(description)
    setShowSuggestions(false)
    onSendAnswer(description)
  }
  const service = new window.google.maps.places.AutocompleteService()

  useEffect(() => {
    initialiseMap(inputRef)
  }, [])

  useEffect(() => {
    isEmpty(searchAddress) && setAllOptions([])
  }, [searchAddress])

  if (!isEmpty(searchAddress)) {
    setAddressSuggestions(searchAddress, allOptions, setAllOptions, service)
  }

  return (
    <div>
      <div onClick={() => setShowSuggestions(true)}>
        <Input
          id="address-input"
          ref={inputRef}
          onChange={e => {
            setSearchAddress(e.target.value)
          }}
          value={searchAddress}
        />
      </div>
      {showSuggestiongs &&
        map(({ description }) => (
          <div onClick={() => handleOptionClick(description)}>
            <option id={description}>{description}</option>
          </div>
        ))(allOptions || [])}
    </div>
  )
}

export default AddressPicker
