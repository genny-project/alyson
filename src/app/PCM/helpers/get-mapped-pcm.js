import { find, equals, compose } from 'ramda'
import { useSelector } from 'react-redux'

import { selectCode } from 'redux/db/selectors'
import { pcmKeyDefault } from 'utils/constants'
import getMappedPcm from 'app/PCM/helpers/get-mapped-pcm-from-pcm-object'

const useGetMappedPcm = (identifier, pcmKey = pcmKeyDefault, getterFn = getMappedPcm) => {
  const allPcmCode = compose(useSelector, selectCode)(pcmKey) || []
  const selectedPcmCode = find(equals(identifier))(allPcmCode)
  const selectedPcm = useSelector(selectCode(selectedPcmCode, 'allAttributes'), (left, right) =>
    equals(getterFn(left))(getterFn(right)),
  )
  return getterFn(selectedPcm)
}

export default useGetMappedPcm
