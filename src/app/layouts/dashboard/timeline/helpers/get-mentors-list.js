import { useSelector } from 'react-redux'
import { selectMentors } from 'redux/db/selectors'

const useGetMentorsList = () => {
  const mentorCodes = useSelector(selectMentors)
  return mentorCodes
}

export default useGetMentorsList
