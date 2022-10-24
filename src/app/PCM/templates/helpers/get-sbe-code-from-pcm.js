import { compose, find, propEq } from 'ramda'
import { useSelector } from 'react-redux'
import { selectCodeUnary } from 'redux/db/selectors'

const useGetSbeCodeFromPcm = pcmCode => {
  const allAttributesKey = 'allAttributes'
  const availableInternsObject = compose(useSelector, selectCodeUnary(pcmCode))(allAttributesKey)
  const associatedSbe = find(propEq('attributeCode', 'PRI_LOC1'))(availableInternsObject || [])
  const associatedSbeCode = associatedSbe?.value || associatedSbe?.valueString || ''
  return associatedSbeCode
}

export default useGetSbeCodeFromPcm
