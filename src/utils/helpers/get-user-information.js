import { useSelector } from 'react-redux'

import { selectCode } from 'redux/db/selectors'
import { userKey } from 'utils/constants'

const getUserInformation = userKey => attributeName => {
  const userCode = useSelector(selectCode(userKey))
  const userAttribute = useSelector(selectCode(userCode, attributeName))?.value
  return userAttribute
}

const getUserAttribute = getUserInformation(userKey)

export default getUserAttribute
