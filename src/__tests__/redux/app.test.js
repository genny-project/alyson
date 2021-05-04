import appReducer, {
  newCmd,
  newMsg,
  closeDrawer,
  closeDialog,
  sendMessage,
  initialState,
} from 'redux/app'

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
    DETAIL: '',
    DOWNLOAD_FILE: '',
    TOAST: null,
    FORM: '',
    TABLE: '',
    DUPLICATE_EMAILS: '',
  }

  const expectedStateForCmdDefault = {
    ...initialState,
    TEST_ONE: ['SBE_TEST_ONE', 'SBE_TEST_TWO', 'SBE_TEST_THREE'],
  }

  const expectedStateForToast = {
    ...initialState,
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

// describe('Send Message', () => {
//   const payloadSendMessgae = {
//     data: {
//       data_type: 'test',
//       event_type: 'BTN_CLICK',
//       msg_type: 'EVT_MSG',
//       redirect: true,
//     },
//   }

//   const expectedStateSendMessage = {
//     ...initialState,
//     lastMessage: { data: payloadSendMessgae },
//   }

//   it('should assign the value of payload to the lastMessage key in the state', () => {
//     expect(appReducer(initialState, sendMessage({ data: payloadSendMessgae }))).toEqual(
//       expectedStateSendMessage,
//     )
//   })
// })

describe('New MSG', () => {
  const intialStateCount = {
    ...initialState,
    DASHBOARD_COUNTS: ['SBE_COUNT_TEST_ONE'],
  }

  const payload = {
    data_type: 'BaseEntity',
    msg_type: 'DATA_MSG',
    option: 'EXEC',
    replace: true,
    items: [],
  }

  const payloadDefault = {
    ...payload,
    items: [
      {
        baseEntityAttributes: [
          {
            attributeCode: 'SCH_TITLE',
            attributeName: 'Title',
            baseEntityCode: 'SBE_TEST_ONE',
            value: 'Testing',
            valueString: 'Testing',
          },
          {
            attributeCode: 'COL_PRI_PHONE',
            attributeName: 'Phone',
            baseEntityCode: 'SBE_TEST_ONE',
            index: 4,
            value: '0123456789',
          },
          {
            attributeCode: 'SCH_DISPLAY_MODE',
            attributeName: 'DisplayMode',
            baseEntityCode: 'SBE_TEST_ONE',
            value: 'test',
            valueString: 'test',
          },
        ],
        code: 'SBE_TEST_ONE',
        name: 'SBE_TEST_ONE',
        questions: [],
      },
    ],
  }

  const payloadDetail = {
    ...payload,
    items: [
      {
        baseEntityAttributes: [
          {
            attributeCode: 'SCH_TITLE',
            attributeName: 'Title',
            baseEntityCode: 'SBE_TEST_DETAIL_VIEW',
            value: 'Testing',
            valueString: 'Testing',
          },
          {
            attributeCode: 'COL_PRI_PHONE',
            attributeName: 'Phone',
            baseEntityCode: 'SBE_TEST_DETAIL_VIEW',
            index: 4,
            value: '0123456789',
          },
          {
            attributeCode: 'SCH_DISPLAY_MODE',
            attributeName: 'DisplayMode',
            baseEntityCode: 'SBE_TEST_DETAIL_VIEW',
            value: 'DETAIL_VIEW:test',
            valueString: 'DETAIL_VIEW:test',
          },
        ],
        code: 'SBE_TEST_DETAIL_VIEW',
        name: 'SBE_TEST_DETAIL_VIEW',
        questions: [],
      },
    ],
  }

  const payloadCount = {
    ...payload,
    items: [
      {
        baseEntityAttributes: [
          {
            attributeCode: 'SCH_DISPLAY_MODE',
            attributeName: 'DisplayMode',
            baseEntityCode: 'SBE_TEST_COUNT_TEN',
            value: 'NESTED_COUNT',
            valueString: 'NESTED_COUNT',
          },
        ],
        code: 'SBE_TEST_COUNT_TEN',
      },
    ],
  }

  const payloadAsk = {
    data_type: 'Ask',
    items: [
      {
        attributeCode: 'QQQ_QUESTION_GROUP',
        childAsks: [],
        id: 13811,
        name: 'Intern',
        question: {},
        questionCode: 'QUE_TEST_GRP',
        realm: 'internmatch',
        sourceCode: 'PER_TEST_ONE',
        targetCode: 'PER_TEST_TWO',
      },
    ],
    msg_type: 'DATA_MSG',
    option: 'EXEC',
  }

  const expectedDefaultStateForNewMsg = {
    ...initialState,
    TABLE: 'SBE_TEST_ONE',
  }

  const expectedStateForNewMsgDetail = {
    ...initialState,
    DETAIL: 'SBE_TEST_DETAIL_VIEW',
  }

  const expectedStateForNewMsgCount = {
    ...initialState,
    DASHBOARD_COUNTS: ['SBE_COUNT_TEST_ONE', 'SBE_TEST_COUNT_TEN'],
  }

  const expectedStateForNewMsgASK = {
    ...initialState,
    FORM: 'QUE_TEST_GRP',
  }

  it('should add the current SBE code to the table key in the state', () => {
    expect(appReducer(initialState, newMsg(payloadDefault))).toEqual(expectedDefaultStateForNewMsg)
  })

  it('should add the current SBE code to the DETAIL key in the state if the diplay mode in payload contains DETAIL_VIEW in it', () => {
    expect(appReducer(initialState, newMsg(payloadDetail))).toEqual(expectedStateForNewMsgDetail)
  })

  it('should place a unique array of all the counts in DASHBOARD_COUNTS key of the state', () => {
    expect(appReducer(intialStateCount, newMsg(payloadCount))).toEqual(expectedStateForNewMsgCount)
  })

  it('should add the current questionCode from the payload to the FORM key in the state', () => {
    expect(appReducer(initialState, newMsg(payloadAsk))).toEqual(expectedStateForNewMsgASK)
  })
})
