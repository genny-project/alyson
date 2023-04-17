import { isArray } from 'utils/helpers/is-type'

export const getAsArray = value => {
  return isArray(value) ? value : !!value ? [value] : []
}
