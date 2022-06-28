import { isEmpty, not } from 'ramda'
const isNullOrUndefined = value => value === undefined || value === null

export const isNullOrUndefinedOrEmpty = value => isNullOrUndefined(value) || isEmpty(value)

export const isNotNullOrUndefinedOrEmpty = value => not(isNullOrUndefined(value) || isEmpty(value))

export default isNullOrUndefined
