import { useSelector } from 'react-redux'
import { selectCode } from 'redux/db/selectors'

const useGetMenteeInformation = () => {
  const userCode = useSelector(selectCode('USER'))
  const trainingStatus = useSelector(selectCode(userCode, 'PRI_TRAINING_STATUS'))?.valueString

  return {
    trainingStatus,
  }
}

export default useGetMenteeInformation
