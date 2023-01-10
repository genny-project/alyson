import { includes, keys, reduce } from 'ramda'

/**
 * Returns all PRI_LOCs not in definedFields
 */
const getSpillLocs = (mappedPcm, ...definedFields) =>
  reduce((acc, attributeCode) => {
    acc =
      includes('PRI_LOC')(attributeCode) && !includes(attributeCode)(definedFields)
        ? { ...acc, [attributeCode]: mappedPcm[attributeCode] }
        : acc

    return acc
  }, {})(keys(mappedPcm) || [])

export default getSpillLocs
