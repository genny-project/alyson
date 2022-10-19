import {
  equals,
  compose,
  find,
  prop,
  propEq,
  head,
  splitAt,
  reduce,
  includes,
  last,
  split,
} from 'ramda'
import countryList from './country-list'

export const prepareAnswer = input =>
  equals(input.charAt(0))('+') ? compose(last, split('+'))(input) : input

const getCountryInfo = countryList => countryCode => requiredInfo => {
  let countryObject = find(propEq('code', countryCode))(countryList || [])
  let requiredCountryInfo = prop(requiredInfo)(countryObject)

  return requiredCountryInfo
}

export const getCountryInfoFromCountryList = getCountryInfo(countryList)

export const getCountryObjectFromExistingUserInput = countryList => userInput => {
  const initialInput = compose(head, splitAt(5))(userInput)
  let firstCharacterOfInitialInput = initialInput.charAt(0)
  let initialInputWithPlusPrefix = equals(firstCharacterOfInitialInput)('+')
    ? initialInput
    : `+${initialInput}`

  return reduce((acc, countryObject) => {
    let { code } = countryObject
    acc = includes(`${code}`, initialInputWithPlusPrefix) ? acc.concat(countryObject) : acc
    return acc
  }, [])(countryList)
}

export const getCountryObjectFromUserInput = getCountryObjectFromExistingUserInput(countryList)
