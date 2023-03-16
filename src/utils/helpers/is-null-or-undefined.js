import { compose, not, equals, anyPass, isEmpty, allPass } from 'ramda'

export const isNull = equals(null)
export const isUndefined = equals(undefined)
export const isNullOrUndefined = anyPass([isNull, isUndefined])
export const isNullOrUndefinedOrEmpty = anyPass([isNull, isUndefined, isEmpty])
export const isNullOrUndefinedOrFalse = anyPass([isNull, isUndefined, not])

export const isNotEmpty = compose(not, isEmpty)
/**
 * The same as using !!val
 */
export const doubleBang = compose(not, not)

export const isNotUndefined = compose(not, isUndefined)
export const isNotNull = compose(not, isNull)
export const isNotNullOrUndefined = allPass([isNotUndefined, isNotNull])
export const isNotNullOrUndefinedOrEmpty = allPass([isNotNullOrUndefined, isNotEmpty])
export const isNotNullOrUndefinedOrFalse = allPass([isNotNullOrUndefined, doubleBang])
