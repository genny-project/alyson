import { createSlice } from '@reduxjs/toolkit'
import { includes, map, prop } from 'ramda'
import log from 'utils/log'

const initialState = { cmds: [], DISPLAY: 'DASHBOARD' }

const appSlice = createSlice({
  name: 'app',
  initialState: initialState,
  reducers: {
    newCmd: (state, { payload }) => {
      log('❗', payload)
      state.cmds.push(payload)

      const { cmd_type, code, targetCodes } = payload

      state[cmd_type] = targetCodes || code
    },
    newMsg: (state, { payload }) => {
      const { parentCode, items } = payload

      if (includes('SBE_', parentCode || '')) {
        state.TABLE = { parentCode, rows: map(prop('code'), items) }
      }
    },
  },
})

export const { newCmd, newMsg } = appSlice.actions
export default appSlice.reducer
