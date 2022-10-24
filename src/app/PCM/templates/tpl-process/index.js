import Process from 'app/layouts/process'
import { compose, find, pathOr, propEq } from 'ramda'
import { useSelector } from 'react-redux'
import { selectCodeUnary } from 'redux/db/selectors'

const useGetSbesFromPcm = code => {
  const allAttributesKey = 'allAttributes'
  const availableInternsObject = compose(useSelector, selectCodeUnary(code))(allAttributesKey)
  const associatedSbe = find(propEq('attributeCode', 'PRI_LOC1'))(availableInternsObject || [])
  const associatedSbeValue = associatedSbe?.value || associatedSbe?.valueString || ''
  return associatedSbeValue
}

const TemplateProcess = ({ mappedPcm, depth }) => {
  const availableInterns = pathOr('', ['PRI_LOC1'])(mappedPcm)
  const availableInternsSbeCode = useGetSbesFromPcm(availableInterns)

  const appliedApplications = pathOr('', ['PRI_LOC2'])(mappedPcm)
  const appliedApplicationsSbeCode = useGetSbesFromPcm(appliedApplications)

  const shortlistedApplications = pathOr('', ['PRI_LOC3'])(mappedPcm)
  const shortlistedApplicationsSbeCode = useGetSbesFromPcm(shortlistedApplications)

  const interviewedApplications = pathOr('', ['PRI_LOC4'])(mappedPcm)
  const interviewedApplicationsSbeCode = useGetSbesFromPcm(interviewedApplications)

  const offeredApplications = pathOr('', ['PRI_LOC5'])(mappedPcm)
  const offeredApplicationsSbeCode = useGetSbesFromPcm(offeredApplications)

  const placedApplications = pathOr('', ['PRI_LOC6'])(mappedPcm)
  const placedApplicationsSbeCode = useGetSbesFromPcm(placedApplications)

  const inProgressApplications = pathOr('', ['PRI_LOC7'])(mappedPcm)
  const inProgressApplicationsSbeCode = useGetSbesFromPcm(inProgressApplications)

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
