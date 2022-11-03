import { getCountryInfoFromCountryList } from 'app/DTT/phone/helpers'

describe('Returns specific information about country', () => {
  it('Should return specific information about the country such as its name, code, or icon.', () => {
    expect(getCountryInfoFromCountryList('61')('icon')).toEqual('🇦🇺')
    expect(getCountryInfoFromCountryList('973')('name')).toEqual('Bahrain')
    expect(getCountryInfoFromCountryList('880')('code')).toEqual('880')
  })
})
