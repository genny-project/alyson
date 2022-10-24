import Process from 'app/layouts/process'
import { compose, find, pathOr, propEq, __ } from 'ramda'
import { useSelector } from 'react-redux'
import { selectCodeUnary } from 'redux/db/selectors'

const useGetSbesFromPcm = code => {
  const allAttributesKey = 'allAttributes'
  const availableInternsObject = compose(useSelector, selectCodeUnary(code))(allAttributesKey)
  const associatedSbe = find(propEq('attributeCode', 'PRI_LOC1'))(availableInternsObject || [])
  const associatedSbeValue = associatedSbe?.value || associatedSbe?.valueString || ''
  return associatedSbeValue
}

const getBeObjectFromMappedPcm = pcmObject => location => pathOr('', [location])(pcmObject)

const TemplateProcess = ({ mappedPcm }) => {
  const getBeObject = getBeObjectFromMappedPcm(mappedPcm)
  const getBeObjectBasedOnCode = compose(useGetSbesFromPcm, getBeObject)

  const availableInternsSbeCode = getBeObjectBasedOnCode('PRI_LOC1')
  const appliedApplicationsSbeCode = getBeObjectBasedOnCode('PRI_LOC2')
  const shortlistedApplicationsSbeCode = getBeObjectBasedOnCode('PRI_LOC3')
  const interviewedApplicationsSbeCode = getBeObjectBasedOnCode('PRI_LOC4')
  const offeredApplicationsSbeCode = getBeObjectBasedOnCode('PRI_LOC5')
  const placedApplicationsSbeCode = getBeObjectBasedOnCode('PRI_LOC6')
  const inProgressApplicationsSbeCode = getBeObjectBasedOnCode('PRI_LOC7')

  const processCodes = [
    availableInternsSbeCode,
    appliedApplicationsSbeCode,
    shortlistedApplicationsSbeCode,
    interviewedApplicationsSbeCode,
    offeredApplicationsSbeCode,
    placedApplicationsSbeCode,
    inProgressApplicationsSbeCode,
  ]

  return <Process processCodes={processCodes} />
}

export default TemplateProcess
