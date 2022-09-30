import { find, propEq } from 'ramda'

export const getValueSearchableText = (data, options) => {
  const selected = find(propEq('value', data?.value))(options || [])
  const selectedValue = selected?.value
  const value = selected?.label || data?.value || ''
  return { selectedValue, value }
}
