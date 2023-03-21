import { identity, ifElse, toString } from 'ramda'
import { isString } from 'utils/helpers/is-type'

/**
 * If passed a non-string, will return the result of `R.toString`, otherwise just passes through the given input
 */
const stringify = ifElse(isString, identity, toString)
export default stringify
