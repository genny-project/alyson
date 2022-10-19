import { reduce } from 'ramda'

const getMappedPcm = pcmObject => {
  return reduce((acc, { attributeCode, valueString, baseEntityCode }) => {
    acc = { ...acc, [attributeCode]: valueString, parentCode: baseEntityCode }
    return acc
  }, {})(pcmObject || [])
}

export default getMappedPcm
