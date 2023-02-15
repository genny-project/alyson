import { compose, equals, not, pathOr, split } from 'ramda'

const getFirstName = fullName => {
  if (compose(not, equals(typeof fullName))('string')) return null
  const splittedName = split(' ')(fullName)
  const firstName = pathOr('', [0])(splittedName)
  return firstName
}

export default getFirstName
