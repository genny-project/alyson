import { reduce } from 'ramda'

const getMappedPcm = pcmObject => {
  return reduce((acc, { attributeCode, valueString }) => {
    acc = { ...acc, [attributeCode]: valueString }
    return acc
  }, {})(pcmObject || [])
}

export default getMappedPcm
