import { has, reduce } from 'ramda'
import { useSelector } from 'react-redux'
import { selectCode } from 'redux/db/selectors'

const useGetMappedBaseEntity = code => {
  const baseEntity = useSelector(selectCode(code || '', 'allAttributes'))
  const mappedBe = reduce((acc, elem) => {
    if (has('attributeCode')(elem)) acc = { ...acc, [elem.attributeCode]: elem }
    return acc
  }, {})(baseEntity || [])

  return mappedBe
}

export default useGetMappedBaseEntity
