import { toUpper, slice, toLower } from 'ramda'

const firstUpper = value =>
  `${toUpper(slice(0, 1, value))}${toLower(slice(1, value.length, value))}`

export default firstUpper
