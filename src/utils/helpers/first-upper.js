import { toUpper, compose, toLower, join, adjust, split, toString } from 'ramda'

/**
 * Takes an input and returns that string with the first letter uppercase.
 */
const firstUpper = compose(join(''), adjust(0, toUpper), split(''), toLower, toString)

export default firstUpper
