import { equals, isEmpty, not } from 'ramda'
const isNullOrUndefined = value => equals(value, undefined) || equals(value, null)

export const isNullOrUndefinedOrEmpty = value => isNullOrUndefined(value) || isEmpty(value)

export const isNotNullOrUndefinedOrEmpty = value => not(isNullOrUndefinedOrEmpty(value))

export const isNullOrUndefinedOrFalse = value => isNullOrUndefined(value) || equals(value, false)

export default isNullOrUndefined
