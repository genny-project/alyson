import { toUpper, compose, toLower, join, adjust, split } from 'ramda'
import stringify from 'utils/helpers/stringify'

/**
 * Takes an input, stringifies it (using `utils/helpers/stringify`), then and returns that string with the first letter uppercase.
 */
const firstUpper = compose(join(''), adjust(0, toUpper), split(''), toLower, stringify)

export default firstUpper
