import { equals } from 'ramda'

const getDataValue = value => {
  const isNullDataValue = dataValue => equals(dataValue, null)
  let dataValue = isNullDataValue ? '' : value

  return { isNullDataValue, dataValue }
}

export default getDataValue
