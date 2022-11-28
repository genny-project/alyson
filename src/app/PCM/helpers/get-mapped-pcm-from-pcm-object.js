import { reduce } from 'ramda'

const getMappedPcm = pcmObjectArray => {
  return reduce((acc, { attributeCode, valueString, baseEntityCode }) => {
    acc = { ...acc, [attributeCode]: valueString, parentCode: baseEntityCode }
    return acc
  }, {})(pcmObjectArray || [])
}

export default getMappedPcm
