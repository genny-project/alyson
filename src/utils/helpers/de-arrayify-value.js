const deArrayifyValue = array => (Array.isArray(array) ? (!!array ? array[0] : '') : array)

export default deArrayifyValue
