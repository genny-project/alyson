import { not, isEmpty, any, compose, reduce } from 'ramda'

export const getIsInvalid = inputValue => pattern => {
  if (isEmpty(inputValue)) return false
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
