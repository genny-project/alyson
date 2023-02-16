import {
  compose,
  equals,
  head,
  split,
  any,
  ifElse,
  identity,
  of,
  always,
  type,
  not,
  uniq,
  reduce,
  includes,
} from 'ramda'
import { isArray } from 'utils/helpers/is-type'

export const isTypeOf = typeOf => compose(equals(typeOf), type)
export const maybeThisOrType = fallback =>
  ifElse(isTypeOf(type(fallback)), identity, always(fallback))
export const maybeThisOrString = maybeThisOrType('')
export const maybeThisOrObject = maybeThisOrType({})
export const arrayOrMakeArray = ifElse(isArray, identity, of)
export const getPrefixFromCode = compose(head, split('_'), maybeThisOrString)
export const anyEquals = compose(any, equals)
export const isNotStringifiedEmptyArray = compose(not, equals('[]'))
export const getUniqueValuesFromTwoArrays = firstArray => secondArray =>
  compose(
    uniq,
    reduce(
      (acc, value) => (compose(not, includes(value))(acc) ? acc.concat(value) : acc),
      secondArray,
    ),
  )(firstArray)
