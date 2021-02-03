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

      if (cmd_type === 'DISPLAY' && code === 'NONE') {
        state.MODAL_DISPLAY = code
      } else {
        state[cmd_type] = targetCodes || code
      }
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
