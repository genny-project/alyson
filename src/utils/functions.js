import { any, compose, equals, includes, isEmpty, not, reduce } from 'ramda'

export const getIsInvalid = (inputValue, question) => pattern => {
  if (isEmpty(inputValue) || equals(inputValue, undefined)) return false

  if (Array.isArray(pattern)) {
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
