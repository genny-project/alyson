import { map, find, propEq } from 'ramda'
import safelyParseJson from 'utils/helpers/safely-parse-json'

export const getValue = (data, options) =>
  map(opt => find(propEq('value', opt))(options), safelyParseJson(data?.value, []))
