import { useSelector } from 'react-redux'
import { equals } from 'ramda'
import { selectCode } from 'redux/db/selectors'
import sameLength from 'redux/utils/same-length'
import getUserType from 'utils/helpers/get-user-type'

export const useUserType = () => {
  const userCode = useSelector(selectCode('USER'), equals)
  return getUserType(useSelector(selectCode(userCode), sameLength))
}

export default useUserType
