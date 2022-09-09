import { find, map, propEq } from 'ramda'

const mapOptions = dropdownData => {
  return map(selection => ({
    label: extractName(selection),
    value: selection.code,
    'test-id': selection.code,
  }))(dropdownData)
}

const extractName = selection => {
  const attributes = selection.baseEntityAttributes ?? []
  const nameAttribute = find(propEq('attributeCode', 'PRI_NAME'))(attributes)
  return nameAttribute?.valueString || selection?.name || selection?.code || ''
}

export default mapOptions
