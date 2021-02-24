import { createSlice } from '@reduxjs/toolkit'
import { includes, split } from 'ramda'
import log from 'utils/log'
import { isForm, isAsk, getQuestionCode } from './utils/get-type'
import { keycloak } from 'config/get-api-config'
import setDisplayCode from './utils/set-display-code'
import { onSendFilter } from 'vertx'
// import history from 'config/history'
// import { makePathname } from 'utils/pathname'

const initialState = { filters: [], cmds: [], DISPLAY: 'DASHBOARD', DRAWER: 'NONE', DIALOG: 'NONE' }

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

          if (codes[0] === 'DRAWER') {
            state[codes[0]] = codes[1]
          } else {
            state[cmd_type] = code
            state.DIALOG = 'NONE'
            state.DRAWER = 'NONE'
          }
        } else if (includes('_', code)) {
          const codes = split('_', code)
          state[codes[0]] = codes[1]
        } else {
          if (code === 'NONE') {
            state.DIALOG = code
            state.DRAWER = code
          } else {
            state[cmd_type] = code

            state.DIALOG = 'NONE'
            state.DRAWER = 'NONE'
          }
        }

        if (!(includes('DRAWER', code) || includes('DIALOG', code)) && code !== 'NONE') {
          state.FORM = ''
          if (code !== 'MAP') state.TABLE = ''
          state.FILTERS = []
        }
        state.DETAIL = ''
        state.DOWNLOAD_FILE = ''
        state.TOAST = null
      } else {
        state[cmd_type] = targetCodes || code
      }
      if (cmd_type === 'TOAST') state[cmd_type] = payload
      if (cmd_type === 'LOGOUT' && exec) {
        keycloak.logout()
      }
      if (cmd_type === 'DOWNLOAD_FILE' && exec) {
        window.open(code)
      }
    },
    newMsg: (state, { payload }) => {
      const { items, data_type } = payload

      if (data_type === 'BaseEntity') setDisplayCode(state)(items)

      if (isAsk(data_type)) {
        const questionCode = getQuestionCode(items)
        if (isForm(questionCode)) state.FORM = questionCode
      }
    },
    sendMessage: (state, { payload }) => {
      // const redirect = payload?.data?.redirect
      // if (redirect) history.push(makePathname(payload.data.data), payload.data)
    },
    closeDrawer: state => {
      state.DRAWER = 'NONE'
    },
    closeDialog: state => {
      state.DIALOG = 'NONE'
    },
    addFilter: (state, { payload }) => {
      state.filters.push(payload)
      onSendFilter(payload)
    },
    removeFilter: (state, { payload }) => {
      state.filters = state.filters.filter(f => f.attributeCode !== payload.attributeCode)
      onSendFilter({ ...payload, value: '' })
    },
  },
})

export const {
  newCmd,
  newMsg,
  closeDrawer,
  closeDialog,
  addFilter,
  removeFilter,
  sendMessage,
} = appSlice.actions
export default appSlice.reducer
