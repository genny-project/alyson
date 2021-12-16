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

  if (aliasCode) state[aliasCode] = code
  if (!state[code]) state[code] = []

  const allAttributesKey = `${code}@allAttributes`
  if (!state[allAttributesKey]) {
    state[allAttributesKey] = baseEntityAttributes
  }

  if (parentCode) {
    const rowKey = `${parentCode}@rows`
    if (!state[rowKey]) state[rowKey] = []

    if ((state[rowKey] as Array<string>).indexOf(code) === -1)
      (state[rowKey] as Array<string>).push(code)
  }

  if (includes('SBE_', code)) {
    forEach(action => {
      delete state[action as string]
    }, filter(includes(`${code}@ACT_`), keys(state as object)))
  }

  forEach((attribute: Keyable) => {
    const attributeCode = attribute.attributeCode

    if (!('value' in attribute)) {
      const valueKey = compose(find(includes('value')), keys)(attribute) as string

      attribute = { value: attribute[valueKey], ...attribute }
    } else {
      attribute = { ...attribute }
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

  if (!childAsks.length) {
    initialiseKey(state, `${questionCode}@raw`, item)
  }

  if (childAsks.length) {
    initialiseKey(state, `${questionCode}@wholeData`, childAsks)
  }

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
  const { code, dataType, description } = item || {}
  const { dttCode } = dataType || {}

  const descriptionKey = `${code}@description`

  state[code] = dttCode
  state[dttCode] = dataType
  state[descriptionKey] = description
}

export const formatNotes = (state: DBState) => (item: Note) => {
  const { id, targetCode } = item
  initialiseKey(state, `${targetCode}@NOTES`, [])
  pushUniqueString(state[`${targetCode}@NOTES`] as Array<string>, `${id}`)

  initialiseKey(state, 'NOTES', {})
  state.NOTES[`${id}`] = item
}

export const formatGroupData = (
  state: DBState,
  parentCode: string,
  items: Array<Item>,
  replace: Boolean,
) => {
  const formatted = map(({ name, code }) => ({ code, name }), items || [])
  if (!replace) {
    initialiseKey(state, parentCode, [])
    state[parentCode] = (state[parentCode] as Array<Keyable>).concat(formatted)
  } else {
    state[parentCode] = filter(({ code }) => !includes('GRP_', code), formatted)
  }
}

export const formatDropdownLinks = (
  state: DBState,
  parentCode: string,
  questionCode: string,
  items: Array<Item>,
  replace: Boolean,
) => {
  const key = `${parentCode}-${questionCode}-options`

  initialiseKey(state, key, [])

  if (replace) {
    state[key] = items
  } else {
    state[key] = (state[key] as Array<Keyable>).concat(items)
  }
}
