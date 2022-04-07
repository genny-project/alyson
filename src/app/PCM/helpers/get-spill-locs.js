import { includes, keys, reduce } from 'ramda'

const getSpillLocs = mappedPcm => (...definedFields) => {
  const spill = reduce((acc, attributeCode) => {
    if (includes('PRI_LOC')(attributeCode) && !includes(attributeCode)(definedFields)) {
      acc = { ...acc, [attributeCode]: mappedPcm[attributeCode] }
    }
    return acc
  }, {})(keys(mappedPcm) || [])

  return spill
}

export default getSpillLocs
