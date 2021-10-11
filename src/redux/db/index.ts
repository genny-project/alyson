import { CmdPayload, MsgPayload } from 'redux/types'
import { DBState, Note } from './types'
import { addKey, removeKey } from './utils/update-keys'
import { forEach, includes, split } from 'ramda'
import {
  formatAsk,
  formatAttribute,
  formatBaseEntity,
  formatDropdownLinks,
  formatGroupData,
  formatNotes,
} from './utils/format'
import { newCmd, newMsg } from '../app'

import { createSlice } from '@reduxjs/toolkit'

export const initialState = {
  NOTES: {},
}

const db = createSlice({
  name: 'db',
  initialState: initialState as DBState,
  reducers: {},
  extraReducers: builder => {
    builder.addCase(newMsg, (state: DBState, { payload }: { payload: MsgPayload }) => {
      // console.log('PAYLOAD => ', payload)
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

      // console.log('DATATYPE', data_type)

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
        // console.log('DATA_BASE', state, aliasCode, parentCode)
        forEach(formatBaseEntity(state, aliasCode, parentCode), items)
        return
      }

      if (data_type === 'Ask') {
        forEach(formatAsk(state, replace), items)
        return
      }
      if (data_type === 'Attribute') {
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
