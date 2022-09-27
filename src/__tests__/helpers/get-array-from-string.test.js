import getArrayFromStringValue from 'utils/helpers/get-array-from-string'

describe('Get Array from String', () => {
  it('should split up the string after every comma and return an array', () => {
    const stringValue = 'Hello,how,are,you,?,My,name,is,Person,A,.'

    const splitValuesIntoArray = [
      'Hello',
      'how',
      'are',
      'you',
      '?',
      'My',
      'name',
      'is',
      'Person',
      'A',
      '.',
    ]

    expect(getArrayFromStringValue(stringValue)).toEqual(splitValuesIntoArray)
  })
})
