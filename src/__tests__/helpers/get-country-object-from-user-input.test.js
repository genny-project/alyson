import { getCountryObjectFromUserInput } from 'app/DTT/phone/helpers'

const expectedOutput = [
  {
    name: 'Australia',
    code: '61',
    icon: '🇦🇺',
  },
]

const userInput = '+61324234234'

describe('Returns country object from existing user input', () => {
  it('Should return a country object from existing user input.', () => {
    expect(getCountryObjectFromUserInput(userInput)).toEqual(expectedOutput)
  })
})
