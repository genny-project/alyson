import { includes, keys, reduce } from 'ramda'

const getSpillLocs = mappedPcm => (...definedFields) =>
  reduce((acc, attributeCode) => {
    if (includes('PRI_LOC')(attributeCode) && !includes(attributeCode)(definedFields)) {
      acc = { ...acc, [attributeCode]: mappedPcm[attributeCode] }
    }
    return acc
  }, {})(keys(mappedPcm) || [])

export default getSpillLocs
