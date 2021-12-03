import { T, always, cond, equals } from 'ramda'

const showRedirectUrl = realm =>
  cond([
    [equals('internmatch'), always(true)],
    [T, always(false)],
  ])(realm)

export default showRedirectUrl
