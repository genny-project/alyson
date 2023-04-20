import { compose } from 'ramda'

export const getMagnitude = number => {
  if (number === 0) {
    return 0
  }
  return compose(Math.floor, Math.log10, Math.abs)(number)
}
