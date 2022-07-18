import { equals } from 'ramda'

const getDataValue = dataValue => {
  const isNullDataValue = dataValue => equals(dataValue, null)
  let defaultValue = isNullDataValue ? '' : dataValue

  return { isNullDataValue, defaultValue }
}

export default getDataValue
