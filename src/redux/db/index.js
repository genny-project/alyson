import { forEach } from 'ramda'
import { createSlice } from '@reduxjs/toolkit'
import { newMsg, newCmd } from '../app'
import { formatAsk, formatAttribute, formatBaseEntity } from './utils/format'

const initialState = {}

const db = createSlice({
  name: 'db',
  initialState: initialState,
  extraReducers: {
    [newMsg]: (state, { payload }) => {
      const { items, data_type, aliasCode, parentCode, replace } = payload

      if (replace && parentCode) {
        state[`${parentCode}@rows`] = []
      }

      if (data_type === 'BaseEntity') forEach(formatBaseEntity(state, aliasCode, parentCode), items)
      if (data_type === 'Ask') forEach(formatAsk(state), items)
      if (data_type === 'Attribute') forEach(formatAttribute(state), items)
    },
    [newCmd]: (state, { payload }) => {
      const { cmd_type, code, sourceCode, targetCode } = payload

      if (cmd_type === 'MOVE_ENTITY') {
        if (sourceCode)
          state[`${sourceCode}@rows`] = state[`${sourceCode}@rows`].filter(item => item !== code)
        if (targetCode) state[`${targetCode}@rows`] = [code, ...state[`${sourceCode}@rows`]]
      }
    },
  },
})

export default db.reducer
