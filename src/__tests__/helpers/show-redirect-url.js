import showRedirectUrl from 'utils/helpers/show-redirect-url'

describe('Shows redirect URL', () => {
  it('should return true when the realm is internmatch, otherwise return false.', () => {
    expect(showRedirectUrl('internmatch')).toEqual(true)
    expect(showRedirectUrl('mentormatch')).toEqual(false)
    expect(showRedirectUrl()).toEqual(false)
    expect(showRedirectUrl(null)).toEqual(false)
    expect(showRedirectUrl('')).toEqual(false)
  })
})
