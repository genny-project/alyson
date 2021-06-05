import { map, filter, flatten, equals } from 'ramda'
import { useSelector } from 'react-redux'

import { selectCurrentBes } from 'redux/app/selectors.ts'

const useGetMentorsList = () => {
  const currentBes = useSelector(selectCurrentBes)
  const filteredMentors = flatten(
    map(({ baseEntityAttributes }) =>
      filter(
        ({ attributeCode, valueBoolean }) =>
          attributeCode === 'PRI_IS_MENTOR' && equals(valueBoolean, true),
      )(baseEntityAttributes),
    )(currentBes),
  )
  const mentors = map(({ baseEntityCode }) => baseEntityCode)(filteredMentors)
  return mentors
}

export default useGetMentorsList
