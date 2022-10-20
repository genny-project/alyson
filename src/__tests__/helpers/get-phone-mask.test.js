import { getPhoneMask } from 'app/DTT/phone/helpers'

describe('Returns phone mask', () => {
  it('should return "+{countryCode} 999999999" as the phone mask if countryCode is truthy. Otherwise return "+99999999999" as the phone mask.', () => {
    const countryCode = '+61'
    let selectedFromDropdown = true

    expect(getPhoneMask(countryCode)(selectedFromDropdown)).toEqual(`+${countryCode} 999999999`)
    expect(getPhoneMask(countryCode)((selectedFromDropdown = false))).toEqual(`+99999999999`)
  })
})
