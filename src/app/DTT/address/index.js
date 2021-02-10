import { useState, useRef, useEffect } from 'react'
import { Read } from 'app/DTT/text'
import GoogleMaps from './google_maps'
import { Input } from '@chakra-ui/react'
import { isEmpty } from 'ramda'
const Write = ({ onSendAnswer, data }) => {
  const addressRef = useRef(null)

  const [searchAddress, setSearchAddress] = useState('')
  const [allOptions, setAllOptions] = useState([])
  const [showSuggestiongs, setShowSuggestions] = useState(true)

  const handleSuggestionClick = description => {
    setSearchAddress(description)
    setShowSuggestions(false)
  }
  useEffect(() => {
    isEmpty(searchAddress) && setAllOptions([])
  }, [searchAddress])

  return (
    <>
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
          <div onClick={() => handleSuggestionClick(description)}>
            <option>{description}</option>
          </div>
        ))}
      <GoogleMaps addressRef={addressRef} allOptions={allOptions} setAllOptions={setAllOptions} />
    </>
  )
}
const Address = {
  Write,
  Read,
}
export default Address
