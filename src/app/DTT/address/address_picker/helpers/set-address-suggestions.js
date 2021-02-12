import { equals } from 'ramda'

const setAddressSuggestions = (searchAddress, allOptions, setAllOptions, service) => {
  const setAllOptionsFromPredictions = predictions =>
    !equals(allOptions, predictions) && predictions !== null && setAllOptions(predictions)
  service.getQueryPredictions({ input: searchAddress }, setAllOptionsFromPredictions)
}

export default setAddressSuggestions
