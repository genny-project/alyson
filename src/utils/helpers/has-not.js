import { has, not, compose } from 'ramda'

const hasNot = valueToBeChecked => valueContainer =>
  compose(not, has(valueToBeChecked))(valueContainer)

export default hasNot
