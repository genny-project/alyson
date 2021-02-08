import { reduce } from 'ramda'

export const getAllDetails = reduce(
  (acc, attr) => ({ ...acc, ...{ [attr.attributeCode]: attr.value } }),
  {},
)
