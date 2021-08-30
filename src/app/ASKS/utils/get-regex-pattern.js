import { pathOr } from 'ramda'

const getRegexPattern = pathOr('', ['attribute', 'dataType', 'validationList', 0, 'regex'])

export default getRegexPattern
