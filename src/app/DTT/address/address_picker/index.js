import { useEffect, useState } from 'react'
import { isEmpty, map } from 'ramda'
import { Input, Text } from '@chakra-ui/react'

let service

const AddressPicker = ({ onSendAnswer, data }) => {
  const [searchAddress, setSearchAddress] = useState('')
  const [options, setOptions] = useState([])
  const [showSuggestiongs, setShowSuggestions] = useState(true)

  const handleOptionClick = description => {
    setSearchAddress(description)
    setShowSuggestions(false)
    onSendAnswer(description)
  }

  service = new window.google.maps.places.AutocompleteService()

  useEffect(() => {
    isEmpty(searchAddress)
      ? setOptions([])
      : service.getQueryPredictions({ input: searchAddress }, setOptions)
  }, [searchAddress])

  return (
    <div>
      <Input
        test-id={data?.attributeCode}
        id="address-input"
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
            key={description}
            test-id={description}
            id={description}
            onClick={() => handleOptionClick(description)}
            p="2"
            pl="4"
            cursor="pointer"
            borderRadius="lg"
            _hover={{ bg: 'lightgrey' }}
          >
            {description}
          </Text>
        ))(options || [])}
    </div>
  )
}

export default AddressPicker
