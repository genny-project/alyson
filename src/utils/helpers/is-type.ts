import { is, compose, not, allPass } from 'ramda'

export const isArray = is(Array)
export const isNotArray = compose(not, isArray)

export const isString = is(String)
export const isNotString = compose(not, isString)

export const isNumber = is(Number)
export const isNotNumber = compose(not, isNumber)

export const isBoolean = is(Boolean)
export const isNotBoolean = compose(not, isBoolean)

export const isFunction = is(Function)
export const isNotFunction = compose(not, isFunction)

/**
 * Keep in mind that `Date.now()` does NOT return a date object!
 * Most Date methods return numbers. This only checks for the `Date` class
 */
export const isDate = is(Date)
/**
 * Keep in mind that `Date.now()` does NOT return a date object!
 * Most Date methods return numbers. This only checks for the `Date` class
 */
export const isNotDate = compose(not, isDate)

export const isRegExp = is(RegExp)
export const isNotRegExp = compose(not, isRegExp)

export const isObject = allPass([is(Object), isNotDate, isNotRegExp])
export const isNotObject = compose(not, isObject)
