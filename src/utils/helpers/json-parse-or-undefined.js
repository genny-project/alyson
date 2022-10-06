import isJsonString from './is-json-string'

const jsonParseOrUndefined = string => {
  if (isJsonString(string)) {
    return JSON.parse(string)
  } else {
    return undefined
  }
}

export default jsonParseOrUndefined
