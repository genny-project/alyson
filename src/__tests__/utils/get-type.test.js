import { isForm, isAsk, getQuestionCode } from 'redux/app/utils/get-type'

const payloadOne = {
  data_type: 'Ask',
  delete: false,
  items: [],
  msg_type: 'DATA_MSG',
}
const payloadTwo = {
  ...payloadOne,
  data_type: 'BaseEntity',
}

const itemsOne = [
  {
    attributeCode: 'QQQ_QUESTION_GROUP',
    childAsks: [],
    question: {},
    questionCode: 'QUE_DRAFTS_GRP',
    sourceCode: '',
    targetCode: '',
  },
  {},
]

const itemsTwo = [
  {
    attributeCode: 'QQQ_QUESTION_GROUP',
    childAsks: [],
    question: {},
    questionCode: 'QUE_ADD_ITEMS_GRP',
    sourceCode: '',
    targetCode: '',
  },
]

const itemsThree = [
  {
    attributeCode: 'QQQ_QUESTION_GROUP',
    questionCode: 'QUE_SIDEBAR_GRP',
  },
]

describe('Check if Is Ask', () => {
  it('should return true if the entity is of data type ask otherwise return false', () => {
    expect(isAsk(payloadOne.data_type)).toEqual(true)
    expect(isAsk(payloadTwo.data_type)).toEqual(false)
  })
})

describe('Get QuestionCode from Item', () => {
  it('should return the question code of the item in the first index from the argument being passed', () => {
    expect(getQuestionCode(itemsOne)).toEqual('QUE_DRAFTS_GRP')
    expect(getQuestionCode(itemsTwo)).toEqual('QUE_ADD_ITEMS_GRP')
    expect(getQuestionCode(itemsThree)).toEqual('QUE_SIDEBAR_GRP')
  })
})

describe('Check if Is Form', () => {
  it('should return false if the question group is QUE_DRAFTS_GRP', () => {
    expect(isForm(itemsOne[0].questionCode)).toEqual(false)
  })

  it('should return true if it contains _GRP in the argument being passed', () => {
    expect(isForm(itemsTwo[0].questionCode)).toEqual(true)
    expect(isForm(itemsThree[0].questionCode)).toEqual(true)
  })
})
