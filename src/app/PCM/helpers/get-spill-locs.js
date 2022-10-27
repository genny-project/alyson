import { includes, keys, reduce } from 'ramda'

/**
 * Returns all PRI_LOCs not in definedFields
 */
const getSpillLocs = mappedPcm => (...definedFields) =>
  reduce((acc, attributeCode) => {
    if (
      includes('PRI_LOC')(attributeCode) ||
      (includes('PRI_QUESTION_CODE')(attributeCode) && !includes(attributeCode)(definedFields))
    ) {
      acc = { ...acc, [attributeCode]: mappedPcm[attributeCode] }
    }
    return acc
  }, {})(keys(mappedPcm) || [])

export default getSpillLocs
