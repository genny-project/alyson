import { forEach } from 'ramda'
import { createSlice } from '@reduxjs/toolkit'
import { newMsg } from '../app'
import { formatAsk, formatAttribute, formatBaseEntity } from './utils/format'

const initialState = {}

const db = createSlice({
  name: 'db',
  initialState: initialState,
  extraReducers: {
    [newMsg]: (state, { payload }) => {
      const { items, data_type, aliasCode, parentCode } = payload

      if (data_type === 'BaseEntity') forEach(formatBaseEntity(state, aliasCode, parentCode), items)
      if (data_type === 'Ask') forEach(formatAsk(state), items)
      if (data_type === 'Attribute') forEach(formatAttribute(state), items)
    },
  },
})

export const { newCmd } = db.actions
export default db.reducer
