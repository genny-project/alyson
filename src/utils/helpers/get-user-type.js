import { find, includes, split, last, compose, either, identity, always } from 'ramda'

const getUserType = compose(
  last,
  s => split('_', s || ''),
  find(includes('PRI_IS_')),
  either(identity, always(' ')),
)

export default getUserType
