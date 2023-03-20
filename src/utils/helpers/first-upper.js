import { toUpper, compose, toLower, join, adjust, split } from 'ramda'

/**
 * Takes an input string and returns that string with the first letter uppercase.
 *
 * Will throw an exception if not given a string.
 */
const firstUpper = compose(join(''), adjust(0, toUpper), split(''), toLower)

export default firstUpper
