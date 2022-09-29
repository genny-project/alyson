import { find, propEq } from 'ramda'

export const getValueSearchableText = (data, options) => {
  const selected = find(propEq('value', data?.value))(options)

  return selected || data?.value || undefined
}
