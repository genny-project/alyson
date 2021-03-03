import { keycloak } from 'config/get-api-config'
import { includes } from 'ramda'

const displayMachine = {
  'DRAWER:DETAIL': state => (state['DRAWER'] = 'DETAIL'),
  DIALOG_FORM: state => (state['DIALOG'] = 'FORM'),
  NONE: state => {
    state.DIALOG = 'NONE'
    state.DRAWER = 'NONE'
  },
  DEFAULT: (state, { code }) => {
    state['DISPLAY'] = code

    state.DIALOG = 'NONE'
    state.DRAWER = 'NONE'
  },
}

const clearStateHandler = (state, { code }) => {
  state.DETAIL = ''
  state.DOWNLOAD_FILE = ''
  state.TOAST = null

  if (!(includes('DRAWER', code) || includes('DIALOG', code)) && code !== 'NONE') {
    state.FORM = ''
    if (code !== 'MAP') state.TABLE = ''
  }
}

const cmdMachine = {
  DISPLAY: (state, { code }) => {
    displayMachine[code]
      ? displayMachine[code](state, { code })
      : displayMachine.DEFAULT(state, { code })

    clearStateHandler(state, { code })
  },
  TOAST: (state, payload) => (state['TOAST'] = payload),
  LOGOUT: (_, { exec }) => {
    exec && keycloak.logout()
  },
  DOWNLOAD_FILE: (_, { code }) => {
    window.open(code)
  },
  DEFAULT: (state, { targetCodes, code, cmd_type }) => (state[cmd_type] = targetCodes || code),
}

export { cmdMachine }
