import { createSlice } from '@reduxjs/toolkit'
import log from 'utils/log'
import { isForm, isAsk, getQuestionCode } from './utils/get-type'
import setDisplayCode from './utils/set-display-code'
import { cmdMachine } from './utils/handlers'
import { AppState } from './types'
import { CmdPayload, MsgPayload } from 'redux/types'

export const initialState = {
  cmds: [],
  DISPLAY: 'DASHBOARD',
  DRAWER: 'NONE',
  DIALOG: 'NONE',
  TOAST: null,
  DASHBOARD_COUNTS: null,
}

const appSlice = createSlice({
  name: 'app',
  initialState: initialState as AppState,
  reducers: {
    newCmd: (state: AppState, { payload }: { payload: CmdPayload }) => {
      log('❗', payload)
      state.cmds.push(payload)

      const { cmd_type } = payload

      cmdMachine[cmd_type]
        ? cmdMachine[cmd_type](state, payload)
        : cmdMachine.DEFAULT(state, payload)
    },
    newMsg: (state: AppState, { payload }: { payload: MsgPayload }) => {
      const { items, data_type } = payload

      if (data_type === 'BaseEntity') setDisplayCode(state)(items)

      if (isAsk(data_type)) {
        const questionCode: string = getQuestionCode(items)
        if (isForm(questionCode)) state.FORM = questionCode
      }
    },
    sendMessage: (state, { payload }) => {
      state.lastMessage = payload
    },
    closeDrawer: state => {
      state.DRAWER = 'NONE'
    },
    closeDialog: state => {
      state.DIALOG = 'NONE'
    },
  },
})

export const { newCmd, newMsg, closeDrawer, closeDialog, sendMessage } = appSlice.actions
export default appSlice.reducer
