import { isArray } from 'utils/helpers/is-type'

const deArrayifyValue = array => (isArray ? (!!array ? array[0] : '') : array)

export default deArrayifyValue
