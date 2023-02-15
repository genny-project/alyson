import { createSlice } from '@reduxjs/toolkit'
import log from 'utils/log'
import { isForm, isAsk, getQuestionCode } from './utils/get-type'
import setDisplayCode from './utils/set-display-code'
import { cmdMachine, handleSendMessage } from './utils/handlers'
import { AppState } from './types'
import { CmdPayload, MsgPayload } from 'redux/types'
import { defaultSidebarItem } from 'utils/constants'

export const initialState = {
  DISPLAY: 'DASHBOARD',
  DRAWER: 'NONE',
  DIALOG: 'NONE',
  TOAST: null,
  DASHBOARD_COUNTS: null,
  NOTES: '',
  DUPLICATE_EMAILS: '',
  FIELDMSG: {},
  lastSentMessage: { time: '', data: { data: { code: 'QUE_DASHBOARD_VIEW' } } },
  lastReceivedMessage: {},
  highlightedQuestion: '',
  bufferDropdownOptions: [],
  currentFormQuestions: [],
  currentSidebarItem: defaultSidebarItem,
  waitingForBackendResponse: null,
}

const appSlice = createSlice({
  name: 'app',
  initialState: initialState as AppState,
  reducers: {
    newCmd: (state: AppState, { payload }: { payload: CmdPayload }) => {
      log('❗', payload)

      const { cmd_type } = payload
      state.lastReceivedMessage = { time: new Date(), ...payload }
      state.lastEvent = new Date()
      state.waitingForBackendResponse = 'false'
      console.log('hello')

      cmdMachine[cmd_type]
        ? cmdMachine[cmd_type](state, payload)
        : cmdMachine.DEFAULT(state, payload)
    },
    newMsg: (state: AppState, { payload }: { payload: MsgPayload }) => {
      const { items, data_type } = payload

      state.lastReceivedMessage = { time: new Date(), ...payload }
      state.lastEvent = new Date()
      state.waitingForBackendResponse = 'false'
      console.log('world')

      if (data_type === 'BaseEntity') setDisplayCode(state)(items)
      // if (data_type === 'Note') state.NOTES = payload

      if (isAsk(data_type || '')) {
        const questionCode: string = getQuestionCode(items)
        if (isForm(questionCode || '')) state.FORM = questionCode
      }
    },
    sendMessage: (state, { payload }) => {
      handleSendMessage(payload.data)
      if (payload?.data?.redirect) {
        state.FORM = null
      }
      state.highlightedQuestion = ''
      state.lastSentMessage = { time: new Date(), ...payload }
    },
    closeDrawer: state => {
      state.DRAWER = 'NONE'
    },
    closeDialog: state => {
      state.DIALOG = 'NONE'
    },
    closeNotes: state => {
      state.DRAWER = 'NONE'
    },
    highlightQuestion: (state, { payload }) => {
      state.highlightedQuestion = payload
    },
    bufferDropdownOption: (state, { payload }) => {
      state.bufferDropdownOptions = payload
    },
    setCurrentFormQuestions: (state, { payload }) => {
      state.currentFormQuestions = payload
    },
    setCurrentSidebarItem: (state, { payload }) => {
      state.currentSidebarItem = payload
    },
    setCurrentWaitingForBackendResponse: (state, { payload }) => {
      state.waitingForBackendResponse = payload
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
  highlightQuestion,
  bufferDropdownOption,
  setCurrentFormQuestions,
  setCurrentSidebarItem,
  setCurrentWaitingForBackendResponse,
} = appSlice.actions
export default appSlice.reducer
