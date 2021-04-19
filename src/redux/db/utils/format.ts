import { forEach, compose, keys, includes, find, filter, map } from 'ramda'
import { Item, MsgPayload } from 'redux/types'
import initialiseKey from 'utils/helpers/initialise-key'
import pushUniqueString from 'utils/helpers/push-unique-string'
import safelyParseJson from 'utils/helpers/safely-parse-json'
import { Keyable } from 'utils/types'
import { DBState, Note } from '../types'
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

    if ((state[rowKey] as Array<string>).indexOf(code) === -1)
      (state[rowKey] as Array<string>).push(code)
  }

  if (aliasCode) state[aliasCode] = code
  if (!state[code]) state[code] = []

  const allActionsCurrentlyPresent = filter(includes(`${code}@ACT_`), keys(state as object))

  forEach(action => {
    delete state[action as string]
  }, allActionsCurrentlyPresent)

  forEach((attribute: Keyable) => {
    const attributeCode = attribute.attributeCode

    if (!('value' in attribute)) {
      const valueKey = compose(find(includes('value')), keys)(attribute) as string

      attribute.value = attribute[valueKey]
    }
    attribute.created = ''

    if ((state[code] as Array<string>).indexOf(attributeCode) === -1)
      (state[code] as Array<string>).push(attributeCode)

    state[`${code}@${attributeCode}`] = attribute
  }, sortByIndex(baseEntityAttributes))
}

export const formatAsk = (state: DBState, replace: Boolean) => (item: Item) => {
  const {
    questionCode,
    childAsks = [],
    name,
    question: { html },
  } = item

  initialiseKey(state, questionCode, [])
  initialiseKey(state, `${questionCode}@title`, name)
  initialiseKey(state, `${questionCode}@config`, safelyParseJson(html, {}))

  if (replace) state[questionCode] = []

  forEach((childAsk: Keyable) => {
    const childAskCode = childAsk.questionCode

    const codes = state[questionCode] as Array<string>

    pushUniqueString(codes, childAskCode)
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

export const formatNotes = (state: DBState) => (item: Note) => {
  const { id, targetCode } = item
  initialiseKey(state, `${targetCode}@NOTES`, [])
  pushUniqueString(state[`${targetCode}@NOTES`] as Array<string>, `${id}`)

  initialiseKey(state, 'NOTES', {})
  state.NOTES[`${id}`] = item
}

export const formatGroupData = (state: DBState, parentCode: string, items: Array<Item>) => {
  const formatted = map(({ name, code }) => ({ code, name }), items || [])
  state[parentCode] = filter(({ code }) => !includes('GRP_', code), formatted)
}
