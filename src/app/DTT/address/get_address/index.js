import { useEffect, useRef, useState } from 'react'
import { Input } from '@chakra-ui/react'
import { isEmpty, map } from 'ramda'
import initialiseMap from './helpers/initialise-map'

const GetAddress = ({ onSendAnswer, data }) => {
  const inputRef = useRef(null)
  const [searchAddress, setSearchAddress] = useState('')
  const [allOptions, setAllOptions] = useState([])
  const [showSuggestiongs, setShowSuggestions] = useState(true)
  const handleOptionClick = description => {
    setSearchAddress(description)
    setShowSuggestions(false)
    onSendAnswer(description)
  }

  useEffect(() => {
    initialiseMap(inputRef, searchAddress, allOptions, setAllOptions)
  }, [searchAddress, allOptions])

  useEffect(() => {
    isEmpty(searchAddress) && setAllOptions([])
  }, [searchAddress])

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
export default GetAddress
