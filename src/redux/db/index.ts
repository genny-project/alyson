import { forEach, includes, split } from 'ramda'
import { createSlice } from '@reduxjs/toolkit'
import { newMsg, newCmd } from '../app'
import {
  formatAsk,
  formatAttribute,
  formatBaseEntity,
  formatDropdownLinks,
  formatGroupData,
  formatNotes,
} from './utils/format'
import { DBState, Note } from './types'
import { MsgPayload, CmdPayload } from 'redux/types'
import { addKey, removeKey } from './utils/update-keys'

export const initialState = {
  NOTES: {},
}

const db = createSlice({
  name: 'db',
  initialState: initialState as DBState,
  reducers: {},
  extraReducers: builder => {
    builder.addCase(newMsg, (state: DBState, { payload }: { payload: MsgPayload }) => {
      const {
        items,
        data_type,
        aliasCode,
        parentCode,
        replace,
        linkedApps,
        code,
        questionCode,
        linkCode,
      } = payload
      if (replace && parentCode) {
        state[`${parentCode}@rows`] = []
      }

      if (parentCode && linkCode && questionCode) {
        // new rule
        formatDropdownLinks(state, parentCode, questionCode, items, replace)
        return
      }

      if (parentCode && includes('GRP_', parentCode as string)) {
        // old rule
        formatGroupData(state, parentCode, items, replace)
        return
      }

      if (data_type === 'BaseEntity') {
        forEach(formatBaseEntity(state, aliasCode, parentCode, replace), items)
        return
      }

      if (data_type === 'Ask') {
        forEach(formatAsk(state, replace), items)
        return
      }

      if (data_type === 'Attribute') {
        if (!items) return
        forEach(formatAttribute(state), items)
        return
      }
      if (data_type === 'Note') {
        if (linkedApps) state[`${code}@linkedApps`] = split(',', linkedApps)
        forEach(formatNotes(state), items as Array<Note>)
        return
      }
    })
    builder.addCase(newCmd, (state: DBState, { payload }: { payload: CmdPayload }) => {
      const { cmd_type, code, sourceCode, targetCode } = payload

      if (cmd_type === 'MOVE_ENTITY') {
        if (sourceCode)
          state[`${sourceCode}@rows`] = removeKey(
            state[`${sourceCode}@rows`] as Array<string>,
            code,
          )
        if (targetCode) {
          state[`${targetCode}@rows`] = addKey(state[`${targetCode}@rows`] as Array<string>, code)
        }
      }
    })
  },
})

export default db.reducer
