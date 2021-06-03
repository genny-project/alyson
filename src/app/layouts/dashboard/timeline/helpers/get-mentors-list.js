import { map, filter, flatten } from 'ramda'
import { selectCurrentBes } from 'redux/app/selectors.ts'
import { useSelector } from 'react-redux'

const useGetMentorsList = () => {
  const currentBes = useSelector(selectCurrentBes)
  const filteredMentors = flatten(
    map(({ baseEntityAttributes }) =>
      filter(
        ({ attributeCode, valueBoolean }) =>
          attributeCode === 'PRI_IS_MENTOR' && valueBoolean === true,
      )(baseEntityAttributes),
    )(currentBes),
  )
  const mentors = map(({ baseEntityCode }) => baseEntityCode)(filteredMentors)
  return mentors
}

export default useGetMentorsList
