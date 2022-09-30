import { equals } from 'ramda'

const showVerbose = equals(localStorage.getItem('verbose'))('true')

export default showVerbose
