import { useSelector } from 'react-redux'
import { selectCode } from 'redux/db/selectors'
import getUserType from 'utils/helpers/get-user-type'

const useGetUser = () => {
  const userCode = useSelector(selectCode('USER'))
  return getUserType(useSelector(selectCode(userCode)))
}

export default useGetUser
