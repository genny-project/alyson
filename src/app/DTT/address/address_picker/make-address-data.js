import {
  compose,
  prop,
  head,
  map,
  toString,
  mergeAll,
  path,
  split,
  identity,
  either,
  always,
} from 'ramda'
import { isFunction } from 'utils/helpers/is-type'

const convertTypes = {
  street_number: 'street_number',
  route: 'street_name',
  administrative_area_level_3: 'suburb',
  political: 'suburb',
  administrative_area_level_2: 'suburb',
  administrative_area_level_1: 'state',
  locality: 'suburb',
  sublocality_level_1: 'suburb',
  sublocality: 'suburb',
  neighborhood: 'suburb',
  country: 'country',
  postal_code: 'postal_code',
}

const makeType = types => convertTypes[head(types)]

const addMetaData = data => (addressObject = {}) => ({
  ...path(['access_points', 0, 'location'], data),
  ...{
    full_address: prop('formatted_address')(data) || '',
    street_address: compose(
      head,
      split(','),
      either(identity, always('')),
      prop('formatted_address'),
    )(data),
  },
  ...{
    latitude: isFunction(path(['geometry', 'location', 'lat'], data))
      ? path(['geometry', 'location', 'lat'], data)()
      : 0,
    longitude: isFunction(path(['geometry', 'location', 'lng'], data))
      ? path(['geometry', 'location', 'lng'], data)()
      : 0,
  },
  ...addressObject,
})

const makeAddressData = data =>
  compose(
    toString,
    addMetaData(data),
    mergeAll,
    map(({ long_name, types }) => ({ [makeType(types)]: long_name })),
    either(identity, always([])),
    prop('address_components'),
  )(data)

export default makeAddressData
