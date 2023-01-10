import { find, equals, compose } from 'ramda'
import { useSelector, shallowEqual } from 'react-redux'

import { selectCode } from 'redux/db/selectors'
import { pcmKeyDefault } from 'utils/constants'
import getMappedPcm from 'app/PCM/helpers/get-mapped-pcm-from-pcm-object'

const useGetMappedPcm = (code, pcmKey = pcmKeyDefault, getterFn = getMappedPcm) => {
  const allPcmCode = compose(useSelector, selectCode)(pcmKey) || []
  const matchingPcmCode = find(equals(code))(allPcmCode)
  const matchingPcmAttributes = useSelector(
    selectCode(matchingPcmCode, 'allAttributes'),
    (prev, current) => shallowEqual(prev, current),
  )

  return getterFn(matchingPcmAttributes)
}

export default useGetMappedPcm
