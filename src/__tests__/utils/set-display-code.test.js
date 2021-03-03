import setDisplayCode from 'redux/app/utils/set-display-code'

const initialState = {
  filters: [],
  cmds: [
    {
      cmd_type: 'SUMMARY_CODES',
      code: 'SUMMARY_CODES',
      exec: true,
      send: true,
      msg_type: 'CMD_MSG',
      option: 'EXEC',
      targetCodes: ['SBE_TEST_ONE'],
    },
  ],
  DISPLAY: 'DASHBOARD',
  DRAWER: 'NONE',
  DIALOG: 'NONE',
  SUMMARY_CODES: ['SBE_TEST_ONE'],
}

const messageOne = {
  data_type: 'BaseEntity',
  msg_type: 'DATA_MSG',
  items: [
    {
      baseEntityAttributes: [
        {
          attributeCode: 'SCH_TITLE',
          attributeName: 'Title',
          baseEntityCode: 'SBE_TEST_ONE',
          value: 'Test One',
          valueString: 'Test One',
        },
        {
          attributeCode: 'COL_PRI_PHONE',
          attributeName: 'Phone',
          baseEntityCode: 'SBE_TEST_ONE',
          value: '0123456789',
        },
        {
          attributeCode: 'PRI_IS_TEST',
          attributeName: '=',
          baseEntityCode: 'SBE_TEST_ONE',
          value: true,
        },
        {
          attributeCode: 'SCH_DISPLAY_MODE',
          attributeName: 'DisplayMode',
          baseEntityCode: 'SBE_TEST_ONE',
          value: 'test_one',
          valueString: 'test_one',
        },
        {
          attributeCode: 'ACT_PRI_EVENT_EDIT',
          attributeName: 'View / Edit',
          baseEntityCode: 'SBE_TEST_ONE',
          value: undefined,
        },
      ],
      code: 'SBE_TEST_ONE',
    },
  ],
}

describe('Set Display Code', () => {
  it('should return the state being passed if no items is passed', () => {
    expect(setDisplayCode(initialState)()).toEqual(undefined)
  })
  //   it('should set the value of the TABLE key to the current SBE', () => {
  //     const expectedState = { ...initialState, TABLE: 'SBE_TEST_ONE' }
  //     expect(setDisplayCode(initialState)(messageOne.items)).toEqual(expectedState)
  //   })
})
