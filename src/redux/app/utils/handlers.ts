import { keycloak } from 'config/get-api-config'
import { includes } from 'ramda'
import { CmdPayload } from 'redux/types'
import { AppState } from '../types'

const displayMachine: {
  [key: string]: Function
} = {
  NOTES: (state: AppState) => (state.NOTES = []),
  'DRAWER:DETAIL': (state: AppState) => (state['DRAWER'] = 'DETAIL'),
  DIALOG_FORM: (state: AppState) => (state['DIALOG'] = 'FORM'),
  NONE: (state: AppState) => {
    state.DIALOG = 'NONE'
    state.DRAWER = 'NONE'
  },
  DEFAULT: (state: AppState, { code }: CmdPayload) => {
    state['DISPLAY'] = code

    state.DIALOG = 'NONE'
    state.DRAWER = 'NONE'
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
  DOWNLOAD_FILE: (_: AppState, { code }: CmdPayload) => {
    window.open(code)
  },
  DEFAULT: (state: AppState, { targetCodes, code, cmd_type }: CmdPayload) =>
    (state[cmd_type] = targetCodes || code),
}

export { cmdMachine }
