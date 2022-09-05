import { isEmpty } from 'ramda'
const isNullOrUndefined = value => value === undefined || value === null || value === 'null'

export const isNullOrUndefinedOrEmpty = value => isNullOrUndefined(value) || isEmpty(value)

export default isNullOrUndefined
