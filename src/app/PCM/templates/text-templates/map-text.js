import { match, reduce, replace } from 'ramda'
import isNotEmpty from 'utils/helpers/is-not-empty'

const mapText = string => mappedPcm => attributeMap => {
  const regex = /\$\{.*?\}{1,2}/m
  const subRegex = /\$\{{2}.*?\}{2}/m
  const subField = /(?<=\$\{{2}).*?(?=\}{2})/m
  const field = /(?<=\$\{{1}).*?(?=\}{1})/m

  const matches = match(regex)(string)

  return reduce((acc, elem) => {
    let replacerMatches
    let loc = undefined
    let data = undefined
    let sub = false

    if (isNotEmpty(match(subRegex)(elem))) {
      replacerMatches = match(subField)(elem)
      sub = true
    } else {
      replacerMatches = match(field)(elem)
    }

    if (isNotEmpty(replacerMatches)) {
      loc = replacerMatches[0]
    }

    data = sub ? attributeMap[mappedPcm[loc]] : mappedPcm[loc]

    if (loc) {
      acc = replace(elem)(data)(acc)
    }

    return acc
  }, string)(matches)
}

export default mapText
