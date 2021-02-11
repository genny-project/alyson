import { equals } from 'ramda'
const setAddressSuggestions = (searchAddress, allOptions, setAllOptions) => {
  const displaySuggestions = predictions =>
    !equals(allOptions, predictions) && setAllOptions(predictions)
  const service = new window.google.maps.places.AutocompleteService()
  service.getQueryPredictions({ input: searchAddress }, displaySuggestions)
}
export default setAddressSuggestions