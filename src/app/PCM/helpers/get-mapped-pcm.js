import { find, equals, reduce } from 'ramda'

import { selectCode } from 'redux/db/selectors'
import { useSelector } from 'react-redux'

const reducePcm = unmappedPcm => {
  return reduce((acc, { attributeCode, valueString }) => {
    acc = { ...acc, [attributeCode]: valueString }
    return acc
  }, {})(unmappedPcm || [])
}

const useGetMappedPcm = identifier => {
  const allPcmCode = useSelector(selectCode(`PCMINFORMATION`)) || []
  const individualPcmCode = find(equals(identifier))(allPcmCode)

  const individualPcm = useSelector(selectCode(individualPcmCode, 'allAttributes'), (left, right) =>
    equals(reducePcm(left))(reducePcm(right)),
  )

  const mappedPcm = reducePcm(individualPcm)

  return mappedPcm
}

export default useGetMappedPcm
