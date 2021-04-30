import { createSlice } from '@reduxjs/toolkit'
import log from 'utils/log'
import { isForm, isAsk, getQuestionCode } from './utils/get-type'
import setDisplayCode from './utils/set-display-code'
import { cmdMachine, handleSendMessage } from './utils/handlers'
import { AppState } from './types'
import { CmdPayload, MsgPayload } from 'redux/types'

export const initialState = {
  DISPLAY: 'DASHBOARD',
  DRAWER: 'NONE',
  DIALOG: 'NONE',
  TOAST: null,
  DASHBOARD_COUNTS: null,
  NOTES: null,
  lastSentMessage: { data: { data: { code: 'QUE_DASHBOARD_VIEW' } } },
}

const appSlice = createSlice({
  name: 'app',
  initialState: initialState as AppState,
  reducers: {
    newCmd: (state: AppState, { payload }: { payload: CmdPayload }) => {
      log('❗', payload)

      const { cmd_type } = payload

      cmdMachine[cmd_type]
        ? cmdMachine[cmd_type](state, payload)
        : cmdMachine.DEFAULT(state, payload)
    },
    newMsg: (state: AppState, { payload }: { payload: MsgPayload }) => {
      const { items, data_type } = payload

      if (data_type === 'BaseEntity') setDisplayCode(state)(items)
      if (data_type === 'Note') state.NOTES = payload

      if (isAsk(data_type)) {
        const questionCode: string = getQuestionCode(items)
        if (isForm(questionCode)) state.FORM = questionCode
      }
    },
    sendMessage: (state, { payload }) => {
      handleSendMessage(payload.data)
      if (payload?.data?.redirect) {
        state.FORM = null
        state.lastMessage = payload
      }
    },
    closeDrawer: state => {
      state.DRAWER = 'NONE'
    },
    closeDialog: state => {
      state.DIALOG = 'NONE'
    },
    closeNotes: state => {
      state.NOTES = null
    },
  },
})

export const {
  newCmd,
  newMsg,
  closeDrawer,
  closeDialog,
  sendMessage,
  closeNotes,
} = appSlice.actions
export default appSlice.reducer
