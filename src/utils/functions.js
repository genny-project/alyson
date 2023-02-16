import { any, compose, includes, not, reduce } from 'ramda'
import { isNullOrUndefinedOrEmpty } from 'utils/helpers/is-null-or-undefined.js'
import { isArray } from 'utils/helpers/is-type'

export const getIsInvalid = inputValue => pattern => {
  if (isNullOrUndefinedOrEmpty(inputValue)) return false

  if (isArray(pattern)) {
    const result = reduce((acc, individualPattern) => {
      return (acc = acc.concat(not(RegExp(individualPattern).test(inputValue))))
    }, [])(pattern)

    return compose(
      not,
      any(value => !value),
    )(result)
  }

  return not(RegExp(pattern).test(inputValue))
}

export const isImageField = includes('IMAGE')
