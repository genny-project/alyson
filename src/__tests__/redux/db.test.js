import dbReducer from 'redux/db'
import { newCmd, newMsg } from 'redux/app'

const initialState = {}

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
    parentCode: 'SBE_TEST_ONE',
    replace: true,
  }

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

  const payloadBE = {
    ...payload,
    data_type: 'BaseEntity',
    items: [
      {
        baseEntityAttributes: [nameAttribute, phoneAttribute, addressAtrribute],
        code: 'CPY_TEST_ONE',
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

  it('should add a key with @row appended to the parentcode and add a key for each baseEntityCode@attributeCode, if replace is true and parentcode is not falsy', () => {
    expect(dbReducer(initialState, newMsg(payloadBE))).toEqual(expectedStateForNewMsgBE)
  })
})
