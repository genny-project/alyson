import { compose, equals, head, split, any, ifElse, identity, of, always, type } from 'ramda'

export const isTypeOf = typeOf => compose(equals(typeOf), type)
export const maybeThisOrType = fallback =>
  ifElse(isTypeOf(type(fallback)), identity, always(fallback))
export const maybeThisOrString = maybeThisOrType('')
export const maybeThisOrObject = maybeThisOrType({})
export const arrayOrMakeArray = ifElse(Array.isArray, identity, of)
export const getPrefixFromCode = compose(head, split('_'), maybeThisOrString)
export const anyEquals = compose(any, equals)
