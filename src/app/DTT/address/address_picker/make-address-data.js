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

const convertTypes = {
  street_number: 'street_number',
  route: 'street_name',
  administrative_area_level_3: 'suburb',
  political: 'suburb',
  administrative_area_level_2: 'suburb',
  administrative_area_level_1: 'state',
  locality: 'suburb',
  country: 'country',
  postal_code: 'postal_code',
}

const makeType = types => convertTypes[head(types)]

const addMetaData = data => (addressObject = {}) => ({
  ...path([0, 'access_points', 0, 'location'], data),
  ...{
    full_address: path([0, 'formatted_address'], data),
    street_address: compose(
      head,
      split(','),
      either(identity, always('')),
      path([0, 'formatted_address']),
    )(data),
  },
  ...{
    latitude:
      typeof path([0, 'geometry', 'location', 'lat'], data) === 'function'
        ? path([0, 'geometry', 'location', 'lat'], data)()
        : 0,
    longitude:
      typeof path([0, 'geometry', 'location', 'lng'], data) === 'function'
        ? path([0, 'geometry', 'location', 'lng'], data)()
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
    head,
  )(data)

export default makeAddressData
