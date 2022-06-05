import { has, not, compose } from 'ramda'

/**
 * Returns the `!` inverse of ramda `has`.
 *
 * `valueToBeChecked` -> The key to look for in `valueContainer`
 *
 * Syntax -> `hasNot(valueToBeChecked)(valueContainer)`
 *
 */
const hasNot = valueToBeChecked => valueContainer =>
  compose(not, has(valueToBeChecked))(valueContainer)

export default hasNot
