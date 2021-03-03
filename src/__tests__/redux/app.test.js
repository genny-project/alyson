import appReducer, { newCmd, newMsg, closeDrawer, closeDialog, sendMessage } from 'redux/app'

const initialState = { cmds: [], DISPLAY: 'DASHBOARD', DRAWER: 'NONE', DIALOG: 'NONE' }

describe('App Reducer', () => {
  it('should return the initial state', () => {
    expect(appReducer(undefined, {})).toEqual(initialState)
  })
})

describe('New CMD MSG', () => {
  const payload = {
    cmd_type: '',
    code: '',
    exec: true,
    msg_type: 'CMD_MSG',
    option: 'EXEC',
    send: true,
  }

  const payloadDisplay = {
    ...payload,
    cmd_type: 'DISPLAY',
    code: 'DASHBOARD',
  }

  const payloadDefault = {
    ...payload,
    cmd_type: 'TEST_ONE',
    code: 'TEST_ONE',
    targetCodes: ['SBE_TEST_ONE', 'SBE_TEST_TWO', 'SBE_TEST_THREE'],
  }

  const payloadToast = {
    ...payload,
    cmd_type: 'TOAST',
    code: 'TOAST',
  }

  const expectedStateForCmdDisplay = {
    ...initialState,
    cmds: [{ ...payloadDisplay }],
    DETAIL: '',
    DOWNLOAD_FILE: '',
    TOAST: null,
    FORM: '',
    TABLE: '',
  }

  const expectedStateForCmdDefault = {
    ...initialState,
    cmds: [{ ...payloadDefault }],
    TEST_ONE: ['SBE_TEST_ONE', 'SBE_TEST_TWO', 'SBE_TEST_THREE'],
  }

  const expectedStateForToast = {
    ...initialState,
    cmds: [{ ...payloadToast }],
    TOAST: payloadToast,
  }

  it('should create a new cmds key in the state and push the payload in the cmds key, if cmd_type is a key in the cmdMachine', () => {
    expect(appReducer(initialState, newCmd(payloadDisplay))).toEqual(expectedStateForCmdDisplay)
  })

  it('should create a new key in the state and set its value as the targetcode or code and push the payload in the cmds key, if cmd_type is not already a key in the cmdMachine', () => {
    expect(appReducer(initialState, newCmd(payloadDefault))).toEqual(expectedStateForCmdDefault)
  })

  it('should replace the current value in the TOAST key with the current payload and push the payload in the cmds key', () => {
    expect(appReducer(initialState, newCmd(payloadToast))).toEqual(expectedStateForToast)
  })
})

describe('Close Drawer', () => {
  const initalStateDrawer = {
    ...initialState,
    DRAWER: 'DETAIL',
  }
  const expectedStateDrawer = {
    ...initialState,
    DRAWER: 'NONE',
  }

  it('should set the value of drawer to NONE in the state', () => {
    expect(appReducer(initalStateDrawer, closeDrawer())).toEqual(expectedStateDrawer)
  })
})

describe('Close Dialog', () => {
  const initialStateDialog = {
    ...initialState,
    DIALOG: 'FORM',
  }
  const expectedStateDialog = {
    ...initialState,
    DIALOG: 'NONE',
  }

  it('should set the value of dialog to NONE in the state', () => {
    expect(appReducer(initialStateDialog, closeDialog())).toEqual(expectedStateDialog)
  })
})

describe('Send Message', () => {
  const payloadSendMessgae = {
    data: {
      data_type: 'test',
      event_type: 'BTN_CLICK',
      msg_type: 'EVT_MSG',
      redirect: true,
    },
  }

  const expectedStateSendMessage = {
    ...initialState,
    lastMessage: payloadSendMessgae,
  }

  it('should assign the value of payload to the lastMessage key in the state', () => {
    expect(appReducer(initialState, sendMessage(payloadSendMessgae))).toEqual(
      expectedStateSendMessage,
    )
  })
})
