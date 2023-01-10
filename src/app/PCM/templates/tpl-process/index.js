import getSpillLocs from 'app/PCM/helpers/get-spill-locs'
import useGetSbeCodeFromPcm from 'app/PCM/templates/helpers/get-sbe-code-from-pcm.js'
import getBeObjectFromMappedPcm from 'app/PCM/templates/helpers/get-be-object-from-mappedPcm'
import Process from 'app/layouts/process'
import { map, compose, keys } from 'ramda'

const TemplateProcess = ({ mappedPcm }) => {
  const spillLocs = getSpillLocs(mappedPcm, 'PRI_LOC1')
  const getBeObject = getBeObjectFromMappedPcm(mappedPcm)
  const processCodes = map(compose(useGetSbeCodeFromPcm, getBeObject))(keys(spillLocs))

  return <Process processCodes={processCodes} />
}

export default TemplateProcess
