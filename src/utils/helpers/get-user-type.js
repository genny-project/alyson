import { find, includes, compose, either, identity, always, replace } from 'ramda'

const getUserType = compose(
  replace('PRI_IS_', ''),
  either(identity, always('')),
  find(includes('PRI_IS_')),
  either(identity, always(' ')),
)

export default getUserType
