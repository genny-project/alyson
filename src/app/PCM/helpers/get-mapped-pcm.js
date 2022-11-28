import { useSelector, shallowEqual } from 'react-redux'

import { selectCode } from 'redux/db/selectors'
import getMappedPcm from 'app/PCM/helpers/get-mapped-pcm-from-pcm-object'

const useGetMappedPcm = (code, getterFn = getMappedPcm) => {
  const selectedPcm = useSelector(selectCode(code, 'allAttributes'), (prev, current) =>
    shallowEqual(prev, current),
  )

  return getterFn(selectedPcm)
}

export default useGetMappedPcm
