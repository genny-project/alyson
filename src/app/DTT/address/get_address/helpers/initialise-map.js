import { isEmpty } from 'ramda'
import setAddressSuggestions from './set-address-suggestions'
const initialiseMap = (inputRef, searchAddress, allOptions, setAllOptions) => {
  let map
  map = new window.google.maps.Map(inputRef.current, {
    zoom: 13,
    mapTypeId: 'roadmap',
  })
  !isEmpty(searchAddress) && setAddressSuggestions(searchAddress, allOptions, setAllOptions)
}
export default initialiseMap