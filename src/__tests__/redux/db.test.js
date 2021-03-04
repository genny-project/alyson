import dbReducer from 'redux/db'
import { newCmd, newMsg } from 'redux/app'

const initialState = {}

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

const childAskEvent = {
  attributeCode: 'PRI_EVENT',
  name: 'Dashboard',
  question: {
    attribute: {
      code: 'PRI_EVENT',
      dataType: {
        dttCode: 'DTT_STRING',
        className: 'java.lang.String',
        typeName: 'java.lang.String',
      },
    },
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
        attribute: {
          code: 'PRI_EVENT',
          dataType: {
            dttCode: 'DTT_STRING',
            className: 'java.lang.String',
            typeName: 'java.lang.String',
            inputmask: '',
            validationList: Array(0),
          },
        },
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
    attribute: {
      code: 'QQQ_QUESTION_GROUP',
      dataType: {
        className: 'java.lang.String',
        dttCode: 'DTT_STRING',
        inputmask: '',
        typeName: 'java.lang.String',
      },
      name: 'link',
    },
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
  }

  it('should add a key with @row appended to the parentcode and add a key for each baseEntityCode@attributeCode, if replace is true and parentcode is not falsy', () => {
    expect(dbReducer(initialState, newMsg(payloadBE))).toEqual(expectedStateForNewMsgBE)
  })

  it('should create keys for all the childAsks with questionCode@childAskCode in the state', () => {
    expect(dbReducer(initialState, newMsg(payloadAsk))).toEqual(expectedStateForNewMsgAsk)
  })
})

//questionCode = "QUE_PROJECT_TEST_GRP"
//childAskCode = [QUE_TEST_ONE_VIEW, QUE_TEST_TWO_VIEW]
