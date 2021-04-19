import dbReducer, { initialState } from 'redux/db'
import { newCmd, newMsg } from 'redux/app'

const nameAttribute = {
  attributeCode: 'PRI_NAME',
  attributeName: 'Name ',
  baseEntityCode: 'CPY_TEST_ONE',
  index: 0,
}

const phoneAttribute = {
  attributeCode: 'PRI_PHONE',
  attributeName: 'Phone ',
  baseEntityCode: 'CPY_TEST_ONE',
  index: 1,
}

const addressAtrribute = {
  attributeCode: 'PRI_ADDRESS',
  attributeName: 'Address ',
  baseEntityCode: 'CPY_TEST_ONE',
  index: 2,
}

const pazeSizeDataType = {
  dttCode: 'DTT_1_TO_20',
  className: 'java.lang.Integer',
  typeName: 'java.lang.Integer',
  component: 'text',
}

const colourDataType = {
  dttCode: 'DTT_TEXT',
  className: 'Text',
  typeName: 'Text',
  component: 'text',
  validationList: Array(1),
}

const eventDataType = {
  dttCode: 'DTT_STRING',
  className: 'java.lang.String',
  typeName: 'java.lang.String',
}

const questionGroupDataType = {
  className: 'java.lang.String',
  dttCode: 'DTT_STRING',
  typeName: 'java.lang.String',
}

const attributePageSize = {
  code: 'SCH_PAGE_SIZE',
  dataType: pazeSizeDataType,
}

const attributeColour = {
  code: 'PRI_COLOR',
  dataType: colourDataType,
}

const attributeEvent = {
  code: 'PRI_EVENT',
  dataType: eventDataType,
}

const attributeQuestionGroup = {
  code: 'QQQ_QUESTION_GROUP',
  dataType: questionGroupDataType,
  name: 'link',
}

const childAskEvent = {
  attributeCode: 'PRI_EVENT',
  name: 'Dashboard',
  question: {
    attribute: attributeEvent,
    attributeCode: 'PRI_EVENT',
    code: 'QUE_TEST_ONE_VIEW',
    name: 'Dashboard',
  },
  questionCode: 'QUE_TEST_ONE_VIEW',
  sourceCode: 'PER_TESTER_ONE',
  targetCode: 'PER_TESTER_ONE',
}

const childAskQuestion = {
  attributeCode: 'QQQ_QUESTION_GROUP',
  childAsks: [
    {
      attributeCode: 'PRI_EVENT',
      name: 'Interns',
      question: {
        attribute: attributeEvent,
        attributeCode: 'PRI_EVENT',
        code: 'QUE_TREE_ITEM_INTERNS',
        name: 'Interns',
      },
      questionCode: 'QUE_TREE_ITEM_INTERNS',
      sourceCode: 'PER_TESTER_ONE',
      targetCode: 'PER_TESTER_ONE',
    },
  ],
  name: 'Contacts',
  question: {
    attribute: attributeQuestionGroup,
    attributeCode: 'QQQ_QUESTION_GROUP',
    code: 'QUE_TEST_TWO_VIEW',
    name: 'contacts',
  },
  questionCode: 'QUE_TEST_TWO_VIEW',
  sourceCode: 'PER_TESTER_ONE',
  targetCode: 'PER_TESTER_ONE',
}

describe('DB Reducer', () => {
  it('should return the initial state', () => {
    expect(dbReducer(undefined, {})).toEqual(initialState)
  })
})

describe('New Msg', () => {
  const payload = {
    data_type: '',
    items: [],
    msg_type: 'DATA_MSG',
    option: 'EXEC',
    replace: true,
  }

  const payloadBE = {
    ...payload,
    data_type: 'BaseEntity',
    parentCode: 'SBE_TEST_ONE',
    items: [
      {
        baseEntityAttributes: [nameAttribute, phoneAttribute, addressAtrribute],
        code: 'CPY_TEST_ONE',
      },
    ],
  }

  const payloadAsk = {
    ...payload,
    data_type: 'Ask',
    items: [
      {
        attributeCode: 'QQQ_QUESTION_GROUP',
        childAsks: [childAskEvent, childAskQuestion],
        name: 'Test',
        question: {
          attributeCode: 'QQQ_QUESTION_GROUP',
          code: 'QUE_PROJECT_TEST_GRP',
          name: 'Test',
        },
        questionCode: 'QUE_PROJECT_TEST_GRP',
        sourceCode: 'PER_TESTER_ONE',
        targetCode: 'PER_TESTER_ONE',
      },
    ],
  }

  const payloadAttribute = {
    ...payload,
    data_type: 'Attribute',
    items: [attributePageSize, attributeColour, attributeEvent, attributeQuestionGroup],
  }

  const payloadMoveEntityWithoutSC = {
    cmd_type: 'MOVE_ENTITY',
    code: 'APP_TEST_ONE',
    exec: true,
    msg_type: 'CMD_MSG',
    option: 'EXEC',
    send: true,
    targetCode: 'SBE_TEST_ONE',
  }

  const payloadMoveEntityWithSC = {
    ...payloadMoveEntityWithoutSC,
    sourceCode: 'SBE_TEST_TWO',
  }

  const expectedStateForNewMsgBE = {
    ...initialState,
    'SBE_TEST_ONE@rows': ['CPY_TEST_ONE'],
    CPY_TEST_ONE: ['PRI_NAME', 'PRI_PHONE', 'PRI_ADDRESS'],
    'CPY_TEST_ONE@PRI_NAME': nameAttribute,
    'CPY_TEST_ONE@PRI_PHONE': phoneAttribute,
    'CPY_TEST_ONE@PRI_ADDRESS': addressAtrribute,
  }

  const expectedStateForNewMsgAsk = {
    ...initialState,
    QUE_PROJECT_TEST_GRP: ['QUE_TEST_ONE_VIEW', 'QUE_TEST_TWO_VIEW'],
    'QUE_PROJECT_TEST_GRP@title': 'Test',
    'QUE_PROJECT_TEST_GRP@QUE_TEST_ONE_VIEW': childAskEvent,
    'QUE_PROJECT_TEST_GRP@QUE_TEST_TWO_VIEW': childAskQuestion,
    'QUE_PROJECT_TEST_GRP@config': {},
  }

  const expectedStateForNewMsgAttribute = {
    ...initialState,
    SCH_PAGE_SIZE: 'DTT_1_TO_20',
    PRI_COLOR: 'DTT_TEXT',
    PRI_EVENT: 'DTT_STRING',
    QQQ_QUESTION_GROUP: 'DTT_STRING',
    DTT_1_TO_20: pazeSizeDataType,
    DTT_TEXT: colourDataType,
    DTT_STRING: eventDataType,
  }

  const expectedStateForNewMsgMoveEntityWithoutSC = {
    ...initialState,
    'SBE_TEST_ONE@rows': ['APP_TEST_ONE'],
  }

  const expectedStateForNewMsgMoveEntityWithSC = {
    ...initialState,
    'SBE_TEST_ONE@rows': ['APP_TEST_ONE'],
    'SBE_TEST_TWO@rows': ['APP_TEST_TWO', 'APP_TEST_THREE'],
  }

  const stateMoveBaseEntity = {
    ...initialState,
    'SBE_TEST_TWO@rows': ['APP_TEST_ONE', 'APP_TEST_TWO', 'APP_TEST_THREE'],
  }

  it('should add a key with @row appended to the parentcode and add a key for each baseEntityCode@attributeCode, if replace is true and parentcode is not falsy', () => {
    expect(dbReducer(initialState, newMsg(payloadBE))).toEqual(expectedStateForNewMsgBE)
  })

  it('should create keys for all the childAsks with questionCode@childAskCode in the state', () => {
    expect(dbReducer(initialState, newMsg(payloadAsk))).toEqual(expectedStateForNewMsgAsk)
  })

  it('should create keys for all the individual attributes and data types in the state', () => {
    expect(dbReducer(initialState, newMsg(payloadAttribute))).toEqual(
      expectedStateForNewMsgAttribute,
    )
  })

  it('should create targetCode@row in the state if not already present and push the current code in the value', () => {
    expect(dbReducer(initialState, newCmd(payloadMoveEntityWithoutSC))).toEqual(
      expectedStateForNewMsgMoveEntityWithoutSC,
    )
  })

  it('should remove the current code from the value of key sourceCode@row in the state', () => {
    expect(dbReducer(stateMoveBaseEntity, newCmd(payloadMoveEntityWithSC))).toEqual(
      expectedStateForNewMsgMoveEntityWithSC,
    )
  })
})
