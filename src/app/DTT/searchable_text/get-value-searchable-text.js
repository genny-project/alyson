import { find, propEq } from 'ramda'
import jsonParseOrUndefined from 'utils/helpers/json-parse-or-undefined'

export const getValueSearchableText = (data, options) => {
  const dataMap = jsonParseOrUndefined(data)
  data = dataMap ?? data

  const findOptionByValue = (val1, val2) => record =>
    propEq('value', val1)(record) || propEq('value', val2)(record)

  const selected = find(findOptionByValue(data?.value, data?.selectedOption, data?.userInput))(
    options || [],
  )
  const selectedValue = selected?.value || selected?.selectedOption

  const value = selected?.label || data?.value || data?.userInput || ''
  return { selectedValue, value }
}
