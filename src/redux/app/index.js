import { createSlice } from '@reduxjs/toolkit'
import { map, prop } from 'ramda'
import log from 'utils/log'
import { isForm, isTable, isAsk, getQuestionCode } from './utils/get-type'
import { keycloak } from 'config/get-api-config'

const initialState = { cmds: [], DISPLAY: 'DASHBOARD' }

const appSlice = createSlice({
  name: 'app',
  initialState: initialState,
  reducers: {
    newCmd: (state, { payload }) => {
      log('❗', payload)
      state.cmds.push(payload)

      const { cmd_type, code, targetCodes, exec } = payload

      if (cmd_type === 'DISPLAY' && code === 'NONE') {
        state.MODAL_DISPLAY = code
      } else {
        state[cmd_type] = targetCodes || code
      }
      if (cmd_type === 'LOGOUT' && exec) {
        keycloak.logout()
      }
    },
    newMsg: (state, { payload }) => {
      const { parentCode, items, data_type } = payload

      if (isTable(parentCode || '')) state.TABLE = { parentCode, rows: map(prop('code'), items) }
      if (isAsk(data_type)) {
        const questionCode = getQuestionCode(items)
        if (isForm(questionCode)) state.FORM = questionCode
      }
    },
  },
})

export const { newCmd, newMsg } = appSlice.actions
export default appSlice.reducer
