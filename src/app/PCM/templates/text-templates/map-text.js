import { match, replace, isEmpty, head } from 'ramda'

const mapText = string => mappedPcm => attributeMap => {
  const fieldRegex = /\$\{.*?\}{1,2}/m
  const keyRegex = /(?<=\$\{{1}).*?(?=\}{1})/m

  const fieldMatch = match(fieldRegex)(string)

  if (isEmpty(fieldMatch)) {
    return string
  } else {
    const fieldString = head(fieldMatch)
    const key = head(match(keyRegex)(fieldString)) || ''

    const attributeCode = mappedPcm[key] || ''
    const replacement = attributeMap[attributeCode] || ''
    const newString = replace(fieldString)(replacement)(string)
    return mapText(newString)(mappedPcm)(attributeMap)
  }
}

export default mapText
