import { pathOr, split } from 'ramda'
import { isNotString } from 'utils/helpers/is-type'

const getFirstName = fullName => {
  if (isNotString(fullName)) {
    return null
  }
  const splittedName = split(' ')(fullName)
  return pathOr('', [0])(splittedName)
}

export default getFirstName
