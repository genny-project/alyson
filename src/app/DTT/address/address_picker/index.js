import { useEffect, useRef, useState } from 'react'
import { isEmpty, map } from 'ramda'
import { Input, Text } from '@chakra-ui/react'
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
    isEmpty(searchAddress)
      ? setAllOptions([])
      : setAddressSuggestions(searchAddress, allOptions, setAllOptions, service)
  }, [allOptions, searchAddress])

  return (
    <div>
      <Input
        test-id={data?.attributeCode}
        id="address-input"
        ref={inputRef}
        value={searchAddress}
        onChange={e => {
          setSearchAddress(e.target.value)
        }}
        onClick={() => {
          setShowSuggestions(true)
        }}
      />
      {showSuggestiongs &&
        map(({ description }) => (
          <Text
            test-id={description}
            id={description}
            onClick={() => handleOptionClick(description)}
            borderBottom="1px solid teal"
            padding="7px 0"
          >
            {description}
          </Text>
        ))(allOptions || [])}
    </div>
  )
}

export default AddressPicker
