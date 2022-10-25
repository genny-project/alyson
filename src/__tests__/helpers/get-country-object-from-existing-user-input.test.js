import { getCountryObjectFromExistingUserInput } from 'app/DTT/phone/helpers'

const countryListCopy = [
  {
    name: 'Afghanistan',
    code: '93',
    icon: '🇦🇫',
  },
  {
    name: 'Australia',
    code: '61',
    icon: '🇦🇺',
  },
  {
    name: 'Bahrain',
    code: '973',
    icon: '🇧🇭',
  },
  {
    name: 'Bangladesh',
    code: '880',
    icon: '🇧🇩',
  },
  {
    name: 'Bhutan',
    code: '975',
    icon: '🇧🇹',
  },
]

const userInput = '+97534567890'
const expectedOutput = [
  {
    name: 'Bhutan',
    code: '975',
    icon: '🇧🇹',
  },
]

describe('Returns country object from the existing user input', () => {
  it('should return a country object from the existing user input', () => {
    expect(getCountryObjectFromExistingUserInput(countryListCopy)(userInput)).toEqual(
      expectedOutput,
    )
  })
})
