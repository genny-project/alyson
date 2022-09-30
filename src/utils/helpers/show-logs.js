import { equals } from 'ramda'

const showLogs =
  process.env.NODE_ENV !== 'production' || equals(localStorage.getItem('useDev'))('true')

export default showLogs
