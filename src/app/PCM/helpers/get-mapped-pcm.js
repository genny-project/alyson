import { find, includes, reduce } from 'ramda'
import { useSelector } from 'react-redux'
import { selectCode } from 'redux/db/selectors'

const useGetMappedPcm = identifier => {
  const allPcmCode = useSelector(selectCode(`PCMINFORMATION`)) || []
  const individualPcmCode = find(includes(identifier))(allPcmCode)

  const individualPcm = useSelector(selectCode(individualPcmCode, 'allAttributes'))
  const mappedPcm = reduce(
    (acc, { attributeCode, valueString }) => {
      acc = { ...acc, [attributeCode]: valueString }
      return acc
    },
    { identifier: identifier },
  )(individualPcm || [])
  //I added this identifier section as it means we can access the pcm code more easily further down the tree

  return mappedPcm
}

export default useGetMappedPcm
