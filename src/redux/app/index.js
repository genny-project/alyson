import { createSlice } from '@reduxjs/toolkit'
import { map, prop, includes, split } from 'ramda'
import log from 'utils/log'
import { isForm, isTable, isAsk, getQuestionCode } from './utils/get-type'
import { keycloak } from 'config/get-api-config'

const initialState = { cmds: [], DISPLAY: 'DASHBOARD', DRAWER: 'NONE' }

const appSlice = createSlice({
  name: 'app',
  initialState: initialState,
  reducers: {
    newCmd: (state, { payload }) => {
      log('❗', payload)
      state.cmds.push(payload)

      const { cmd_type, code, targetCodes, exec } = payload

      if (cmd_type === 'DISPLAY') {
        if (includes(':', code)) {
          const codes = split(':', code)

          state[codes[0]] = codes[1]
        } else {
          if (code === 'NONE') {
            state.MODAL_DISPLAY = code
            state.DRAWER = code
          } else {
            state[cmd_type] = code
          }
        }
      } else {
        state[cmd_type] = targetCodes || code
      }
      if (cmd_type === 'LOGOUT' && exec) {
        keycloak.logout()
      }
    },
    newMsg: (state, { payload }) => {
      const { parentCode, items, data_type } = payload

      if (isTable(parentCode || '')) state.TABLE = parentCode
      if (isAsk(data_type)) {
        const questionCode = getQuestionCode(items)
        if (isForm(questionCode)) state.FORM = questionCode
      }
    },
    closeDrawer: state => {
      state.DRAWER = 'NONE'
    },
  },
})

export const { newCmd, newMsg, closeDrawer } = appSlice.actions
export default appSlice.reducer
