import { not, isEmpty } from 'ramda'

export const getIsInvalid = value => pattern =>
  isEmpty(value) ? false : not(RegExp(pattern).test(value)) ? true : false
