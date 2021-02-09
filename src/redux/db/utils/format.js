import { forEach, compose, keys, includes, find } from 'ramda'
import sortByIndex from './sort-by-index'

export const formatBaseEntity = (state, aliasCode, parentCode) => (item = {}) => {
  if (!item) return

  const { code, baseEntityAttributes = [] } = item

  if (parentCode) {
    const rowKey = `${parentCode}@rows`
    if (!state[rowKey]) state[rowKey] = []
    if (state[rowKey].indexOf(code) === -1) state[rowKey].push(code)
  }

  if (aliasCode) state[aliasCode] = code
  if (!state[code]) state[code] = []

  forEach(attribute => {
    const attributeCode = attribute.attributeCode

    if (!('value' in attribute)) {
      const valueKey = compose(find(includes('value')), keys)(attribute)

      attribute.value = attribute[valueKey]
    }

    if (state[code].indexOf(attributeCode) === -1) state[code].push(attributeCode)

    state[`${code}@${attributeCode}`] = attribute
  }, sortByIndex(baseEntityAttributes))
}

export const formatAsk = state => (item = {}) => {
  const { questionCode, childAsks = [], name } = item

  if (!state[questionCode]) state[questionCode] = []
  if (!state[`${questionCode}@title`]) state[`${questionCode}@title`] = name

  forEach(childAsk => {
    const childAskCode = childAsk.questionCode

    if (state[questionCode].indexOf(childAskCode) === -1) state[questionCode].push(childAskCode)

    state[`${questionCode}@${childAskCode}`] = childAsk
  }, sortByIndex(childAsks))
}

export const formatAttribute = state => (item = {}) => {
  const { code, dataType } = item
  const { dttCode } = dataType

  state[code] = dttCode
  state[dttCode] = dataType
}
