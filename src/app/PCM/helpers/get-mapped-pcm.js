import { find, equals, compose } from 'ramda'
import { useSelector } from 'react-redux'

import { selectCode } from 'redux/db/selectors'
import { pcmKey } from 'utils/constants'
import getMappedPcm from 'app/PCM/helpers/get-mapped-pcm-from-pcm-object'

const useGetMappedPcm = identifier => {
  const allPcmCode = compose(useSelector, selectCode)(pcmKey) || []
  const selectedPcmCode = find(equals(identifier))(allPcmCode)
  const selectedPcm = useSelector(selectCode(selectedPcmCode, 'allAttributes'), (left, right) =>
    equals(getMappedPcm(left))(getMappedPcm(right)),
  )
  return getMappedPcm(selectedPcm)
}

export default useGetMappedPcm
