import { DBState, Note } from '../types'
import { Item, MsgPayload } from 'redux/types'
import { compose, filter, find, forEach, includes, keys, map } from 'ramda'

import { Keyable } from 'utils/types'
import initialiseKey from 'utils/helpers/initialise-key'
import pushUniqueString from 'utils/helpers/push-unique-string'
import safelyParseJson from 'utils/helpers/safely-parse-json'
import sortByIndex from './sort-by-index'

export const formatBaseEntity = (
  state: DBState,
  aliasCode: MsgPayload['aliasCode'],
  parentCode: MsgPayload['parentCode'],
  replace: Boolean,
) => (item: Item) => {
  if (!item) return

  const { code, baseEntityAttributes = [] } = item

  if (aliasCode) state[aliasCode] = code
  if (!state[code]) state[code] = []

  const allAttributesKey = `${code}@allAttributes`

  //create a key to store pcm information
  const pcmKey = `PCMINFORMATION`

  // If replace is true, update the all Attributes key
  if (!state[allAttributesKey] || replace) {
    state[allAttributesKey] = baseEntityAttributes
  }

  //store all the availalble PCM in the key
  if (!state[pcmKey]) state[pcmKey] = []

  if (code && includes('PCM_')(code)) {
    if ((state[pcmKey] as Array<any>).indexOf(code) === -1) (state[pcmKey] as Array<any>).push(code)
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

    if (attributeCode === 'PRI_IS_MENTOR' && attribute.value) {
      initialiseKey(state, 'MENTORS', [])
      if ((state.MENTORS as Array<string>).indexOf(code) === -1)
        (state.MENTORS as Array<string>).push(code)
    }

    if (attributeCode === 'PRI_IS_MENTEE' && attribute.value) {
      initialiseKey(state, 'MENTEE', [])
      if ((state.MENTEE as Array<string>).indexOf(code) === -1)
        (state.MENTEE as Array<string>).push(code)
    }

    if ((state[code] as Array<string>).indexOf(attributeCode) === -1)
      (state[code] as Array<string>).push(attributeCode)

    state[`${code}@${attributeCode}`] = attribute
  }, sortByIndex(baseEntityAttributes))
}

export const formatAsk = (state: DBState, replace: Boolean) => (item: Item) => {
  const { questionCode, childAsks = [], name, question, targetCode, attributeCode } = item

  const { html } = question

  const wholeDataKey = `${questionCode}@wholeData`
  const rawKey = `${questionCode}@raw`
  const attributeCodekey = `${questionCode}@attributeCode`
  const nameKey = `${questionCode}@title`
  const targetCodeKey = `${questionCode}@targetCode`
  const configKey = `${questionCode}@config`

  initialiseKey(state, questionCode, [])
  initialiseKey(state, nameKey, name)
  initialiseKey(state, attributeCodekey, attributeCode)
  initialiseKey(state, targetCodeKey, targetCode)
  initialiseKey(state, configKey, safelyParseJson(html, {}))

  if (replace) {
    state[questionCode] = []
    state[nameKey] = name
    state[attributeCodekey] = attributeCode
    state[targetCodeKey] = targetCode
    state[configKey] = safelyParseJson(html, {})
  }

  if (!childAsks.length) {
    initialiseKey(state, rawKey, item)
    if (replace) {
      state[rawKey] = item
    }
  }

  if (childAsks.length) {
    initialiseKey(state, wholeDataKey, childAsks)
    if (replace) {
      state[wholeDataKey] = childAsks
    }
  }

  forEach((childAsk: Keyable) => {
    const childAskCode = childAsk.questionCode

    const codes = state[questionCode] as Array<string>

    pushUniqueString(codes, childAskCode)
    state[`${questionCode}@${childAskCode}`] = childAsk

    // We really need to store questions recursively
    formatAsk(state, replace)(childAsk)
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
  const { code, dataType, description, name } = item || {}
  const { dttCode } = dataType || {}

  const descriptionKey = `${code}@description`
  initialiseKey(state, `${code}@attributeName`, name || '')

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
