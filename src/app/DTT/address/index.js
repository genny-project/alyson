import { useState, useRef, useEffect } from 'react'
import { Read } from 'app/DTT/text'
import GoogleMaps from './google_maps'
import { Input } from '@chakra-ui/react'
import { isEmpty } from 'ramda'
const Write = ({ onSendAnswer, data }) => {
  const [searchAddress, setSearchAddress] = useState('')
  const [allOptions, setAllOptions] = useState([])
  const [showSuggestiongs, setShowSuggestions] = useState(true)
  useEffect(() => {
    isEmpty(searchAddress) && setAllOptions([])
  }, [searchAddress])
  const addressRef = useRef(null)
  return (
    <div>
      <div onClick={() => setShowSuggestions(true)}>
        <Input
          id="address-input"
          ref={addressRef}
          onChange={e => {
            setSearchAddress(e.target.value)
          }}
          value={searchAddress}
        />
      </div>
      {showSuggestiongs &&
        allOptions.map(({ description }) => (
          <div
            onClick={() => {
              setSearchAddress(description)
              setShowSuggestions(false)
            }}
          >
            <option>{description}</option>
          </div>
        ))}
      <GoogleMaps
        addressRef={addressRef}
        searchAddress={searchAddress}
        allOptions={allOptions}
        setAllOptions={setAllOptions}
      />
    </div>
  )
}
const Address = {
  Write,
  Read,
}
export default Address