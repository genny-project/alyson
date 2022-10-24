import { compose, map } from 'ramda'

import Process from 'app/layouts/process'
import useGetSbeCodeFromPcm from 'app/PCM/templates/helpers/get-sbe-code-from-pcm'
import getBeObjectFromMappedPcm from 'app/PCM/templates/helpers/get-be-object-from-mappedPcm'

const TemplateProcess = ({ mappedPcm }) => {
  const getBeObject = getBeObjectFromMappedPcm(mappedPcm)
  const processCodes = map(compose(useGetSbeCodeFromPcm, getBeObject))([
    'PRI_LOC1',
    'PRI_LOC2',
    'PRI_LOC3',
    'PRI_LOC4',
    'PRI_LOC5',
    'PRI_LOC6',
    'PRI_LOC7',
  ])

  return <Process processCodes={processCodes} />
}

export default TemplateProcess
