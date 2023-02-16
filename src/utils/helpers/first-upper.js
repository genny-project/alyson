import { toUpper, toLower, split, compose, map, adjust, join } from 'ramda'

/**
 * Takes a string like HELlo WORld and returns Hello World
 */
const firstUpper = compose(
  join(' '),
  map(compose(join(''), adjust(0, toUpper), toLower)),
  split(' '),
)

export default firstUpper
