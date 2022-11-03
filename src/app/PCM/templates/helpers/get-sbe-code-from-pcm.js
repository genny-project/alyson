import { compose, find, propEq } from 'ramda'
import { useSelector } from 'react-redux'
import { selectCodeUnary } from 'redux/db/selectors'

const useGetSbeCodeFromPcm = pcmCode => {
  const allAttributesKey = 'allAttributes'
  const locationWithSbeInformation = 'PRI_LOC1'
  const availableInternsObject = compose(useSelector, selectCodeUnary(pcmCode))(allAttributesKey)
  const associatedSbe = find(propEq('attributeCode', locationWithSbeInformation))(
    availableInternsObject || [],
  )
  const associatedSbeCode = associatedSbe?.value || associatedSbe?.valueString || ''
  return associatedSbeCode
}

export default useGetSbeCodeFromPcm
