import { getQuestionCode } from 'redux/app/utils/get-type'

describe('Gets question code from item', () => {
  it('Should return the question code from the item', () => {
    const itemOne = [
      {
        data_type: 'Ask',
        delete: false,
        items: [],
        questionCode: 'QUE_ADD_ITEMS_GRP',
      },
    ]

    const itemTwo = [
      {
        data_type: 'Ask',
        delete: false,
        items: [],
        questionCode: 'QUE_DRAFTS_GRP',
      },
    ]

    expect(getQuestionCode(itemOne)).toEqual('QUE_ADD_ITEMS_GRP')
    expect(getQuestionCode(itemTwo)).toEqual('QUE_DRAFTS_GRP')
  })
})
