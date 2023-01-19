import { equals, includes } from 'ramda'

import { keycloak } from 'config/get-api-config'
import history from 'config/history'
import { CmdPayload, Message } from 'redux/types'
import { makePathname } from 'utils/pathname'
import { AppState } from '../types'

const displayMachine: {
  [key: string]: Function
} = {
  'DRAWER:DETAIL': (state: AppState) => (state['DRAWER'] = 'DETAIL'),
  DIALOG_FORM: (state: AppState) => (state['DIALOG'] = 'FORM'),
  NONE: (state: AppState) => {
    state.DIALOG = 'NONE'
    state.DRAWER = 'NONE'
    state.DUPLICATE_EMAILS = ''
  },
  DEFAULT: (state: AppState, { code }: CmdPayload) => {
    state['DISPLAY'] = code

    state.DIALOG = 'NONE'
    state.DRAWER = 'NONE'
    state.DUPLICATE_EMAILS = ''
  },
}

const clearStateHandler = (state: AppState, code: string) => {
  state.DETAIL = ''
  state.DOWNLOAD_FILE = ''
  state.TOAST = null

  if (!(includes('DRAWER', code) || includes('DIALOG', code)) && code !== 'NONE') {
    state.FORM = ''
    if (code !== 'MAP') state.TABLE = ''
  }
}

const cmdMachine: {
  [key: string]: Function
} = {
  DISPLAY: (state: AppState, { code }: CmdPayload) => {
    displayMachine[code]
      ? displayMachine[code](state, { code })
      : displayMachine.DEFAULT(state, { code })

    clearStateHandler(state, code)
  },
  TOAST: (state: AppState, payload: CmdPayload) => (state['TOAST'] = payload),
  LOGOUT: (_: AppState, { exec }: CmdPayload) => {
    exec && (keycloak as any).logout()
  },
  DOWNLOAD_FILE: (state: AppState, { code, exec }: CmdPayload) => {
    if (exec) window.open(code)
    state.DOWNLOAD_FILE = code
  },
  NOTES: (state: AppState, { code }: CmdPayload) => {
    state['DRAWER'] = 'NOTES'
    state['NOTES'] = code
  },
  FIELDMSG: (state: AppState, payload: CmdPayload) => {
    const { code: parentQuestionCode, questionCode: individualQuestionCode, message } = payload
    const fieldMsgKey = `${parentQuestionCode}@${individualQuestionCode}`

    console.log('%c REDUX STORE ==>', 'background: teal; padding: 18px', {
      parentQuestionCode,
      individualQuestionCode,
      message,
    })
    state['FIELDMSG'] = {
      ...state['FIELDMSG'],
      [fieldMsgKey]: message?.value,
    }
  },
  DEFAULT: (state: AppState, { targetCodes, code, cmd_type }: CmdPayload) => {
    if (targetCodes) {
      if (!equals(state[cmd_type], targetCodes)) state[cmd_type] = targetCodes
    } else {
      state[cmd_type] = code
    }
  },
}

const handleSendMessage = (message: Message) => {
  if (message.redirect) history.push(makePathname(message.data), message)
}
export { cmdMachine, handleSendMessage }
