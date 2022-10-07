import { isAsk } from 'redux/app/utils/get-type'

describe('Checks if the data type is an Ask', () => {
  it('shoudld return true if the data type is an ask and false otherwise', () => {
    const objectOne = {
      data_type: 'Ask',
      delete: false,
      items: [],
    }

    const objectTwo = {
      data_type: 'Attribute',
      delete: false,
      items: [],
    }

    expect(isAsk(objectOne.data_type)).toEqual(true)
    expect(isAsk(objectTwo.data_type)).toEqual(false)
  })
})
