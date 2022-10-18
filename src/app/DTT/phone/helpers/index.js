import { equals, compose, find, prop, propEq, head, splitAt, reduce, includes } from 'ramda'
import countryList from './country-list'

export const prepareAnswer = input => (equals('+')(input) ? '' : input)

const getCountryInfo = countryList => countryCode => requiredInfo => {
  let countryObject = find(propEq('code', countryCode))(countryList || [])
  let requiredCountryInfo = prop(requiredInfo)(countryObject)
  return requiredCountryInfo
}

export const getCountryInfoFromCountryList = getCountryInfo(countryList)

export const getCountryObjectFromExistingUserInput = countryList => userInput => {
  const initialInput = compose(head, splitAt(5))(userInput)
  return reduce((acc, countryObject) => {
    let { code } = countryObject
    acc = includes(`${code}`, initialInput) ? acc.concat(countryObject) : acc
    return acc
  }, [])(countryList)
}

export const getCountryObjectFromUserInput = getCountryObjectFromExistingUserInput(countryList)
