import { reject } from 'ramda'
import {
  isNullOrUndefined,
  isNullOrUndefinedOrEmpty,
  isNullOrUndefinedOrFalse,
  isUndefined,
} from 'utils/helpers/is-null-or-undefined'

/// Returns a new list that excludes any undefined values
export const rejectUndefined = reject(isUndefined)

/// Returns a new list that excludes any null or undefined values
export const rejectNullOrUndefined = reject(isNullOrUndefined)

/// Returns a new lsit that excludes any null, undefined or empty values
export const rejectNullOrUndefinedOrEmpty = reject(isNullOrUndefinedOrEmpty)

/// Returns a new list that excludes any null, undefined, or falsy values
export const rejectNullOrUndefinedOrFalse = reject(isNullOrUndefinedOrFalse)
