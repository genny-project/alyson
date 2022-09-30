import { isForm } from 'redux/app/utils/get-type'

const askOne = 'QUE_ADD_ITEMS_GRP'

const askTwo = 'QUE_DRAFTS_GROUP'

const askThree = 'QUE_DRAFTS_GRP'

describe('Gets the question code and returns true if it not of the type "QUE_DRAFTS_GRP" and the code contains "_GRP"', () => {
  it('should return true if the question code is not of type "QUE_DRAFTS_GRP".', () => {
    expect(isForm(askOne)).toEqual(true)
    expect(isForm(askThree)).toEqual(false)
  })

  it('should return true if the question code contains "_GRP", otherwise return true', () => {
    expect(isForm(askTwo)).toEqual(false)
    expect(isForm(askOne)).toEqual(true)
  })
})
