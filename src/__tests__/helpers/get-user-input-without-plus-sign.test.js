import { getUserInputWithoutPlusSign } from 'app/DTT/phone/helpers'

describe('Returns user input without "+" symbol', () => {
  it('should return the user input without the "+" sign', () => {
    const userInput = '+6112345678'

    expect(getUserInputWithoutPlusSign(userInput)).toEqual('6112345678')
  })
})
