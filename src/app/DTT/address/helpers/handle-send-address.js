import { geocodeByPlaceId } from 'react-google-places-autocomplete'

import makeAddressData from './make-address-data'

const handleSend = async ({ value, onUpdate }) => {
  const result = await geocodeByPlaceId(value.place_id || '')

  if (result) {
    onUpdate({ value: makeAddressData(result) })
  }
}

export default handleSend
