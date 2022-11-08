import { or, find, not, propEq } from 'ramda'

const sbeRowExtractValues = sbeData => {
  const column = 'LNK_FILTER_COLUMN'
  const option = 'LNK_FILTER_OPTION'

  const columnSelection = find(propEq('attributeCode', column))(sbeData)
  const optionSelection = find(propEq('attributeCode', option))(sbeData)

  const valueSelection = find(attr =>
    not(or(propEq('attributeCode', column)(attr))(propEq('attributeCode', option)(attr))),
  )(sbeData)

  const getValue = option => (Array.isArray(option) ? (!!option ? option[0] : '') : option)

  const columnValue = getValue(columnSelection?.value || '')
  const optionValue = getValue(optionSelection?.value || '')
  const valueValue = getValue(valueSelection?.value || '')

  return { columnValue, optionValue, valueValue }
}

export default sbeRowExtractValues
