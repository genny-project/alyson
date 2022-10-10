import { find, equals, compose } from 'ramda'
import { useSelector } from 'react-redux'

import { selectCode } from 'redux/db/selectors'
import { pcmKey } from 'utils/constants'
import getMappedPcm from 'app/PCM/helpers/get-mapped-pcm-from-pcm-object'

const useGetMappedPcm = identifier => {
  const allPcmCode = compose(useSelector, selectCode)(pcmKey) || []
  const individualPcmCode = find(equals(identifier))(allPcmCode)

  const individualPcm = useSelector(selectCode(individualPcmCode, 'allAttributes'), (left, right) =>
    equals(getMappedPcm(left))(getMappedPcm(right)),
  )

  const mappedPcm = getMappedPcm(individualPcm)

  return mappedPcm
}

export default useGetMappedPcm
