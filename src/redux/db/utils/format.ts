import { forEach, compose, keys, includes, find } from 'ramda'
import { Item, MsgPayload } from 'redux/types'
import { Keyable } from 'utils/types'
import { DBState } from '../types'
import sortByIndex from './sort-by-index'

export const formatBaseEntity = (
  state: DBState,
  aliasCode: MsgPayload['aliasCode'],
  parentCode: MsgPayload['parentCode'],
) => (item: Item) => {
  if (!item) return

  const { code, baseEntityAttributes = [] } = item

  if (parentCode) {
    const rowKey = `${parentCode}@rows`
    if (!state[rowKey]) state[rowKey] = []

    const rows = state[rowKey] as Array<string>
    if (rows.indexOf(code) === -1) rows.push(code)
  }

  if (aliasCode) state[aliasCode] = code
  if (!state[code]) state[code] = []

  forEach((attribute: Keyable) => {
    const attributeCode = attribute.attributeCode

    if (!('value' in attribute)) {
      const valueKey = compose(find(includes('value')), keys)(attribute) as string

      attribute.value = attribute[valueKey]
    }

    if ((state[code] as Array<string>).indexOf(attributeCode) === -1)
      (state[code] as Array<string>).push(attributeCode)

    state[`${code}@${attributeCode}`] = attribute
  }, sortByIndex(baseEntityAttributes))
}

export const formatAsk = (state: DBState) => (item: Item) => {
  const { questionCode, childAsks = [], name } = item

  if (!state[questionCode]) state[questionCode] = []
  if (!state[`${questionCode}@title`]) state[`${questionCode}@title`] = name

  forEach((childAsk: Keyable) => {
    const childAskCode = childAsk.questionCode

    const codes = state[questionCode] as Array<string>
    if (codes.indexOf(childAskCode) === -1) codes.push(childAskCode)

    state[`${questionCode}@${childAskCode}`] = childAsk
  }, sortByIndex(childAsks))

  if (!childAsks.length) {
    const keys = Object.keys(state)
    const questions = keys.filter(includes(`@${questionCode}`))
    forEach(question => {
      state[question] = item
    }, questions)
  }
}

export const formatAttribute = (state: DBState) => (item: Item) => {
  const { code, dataType } = item
  const { dttCode } = dataType

  state[code] = dttCode
  state[dttCode] = dataType
}
