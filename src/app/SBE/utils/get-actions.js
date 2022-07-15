import { filter, includes } from 'ramda'
import { useSelector } from 'react-redux'
import { selectCode } from 'redux/db/selectors'

const getActions = sbe => {
  if (sbe) {
    return filter(v => includes('ACT_', v) && !includes('SCH_', v))(sbe)
  }
}

export const useGetActionsFromCode = sbeCode => {
  const sbe = useSelector(selectCode(sbeCode || '', 'allAttributes'))
  if (sbe) {
    return filter(
      v => includes('ACT_')(v?.attributeCode || '') && !includes('SCH_')(v?.attributeCode || ''),
    )(sbe)
  }
}

export const getTableActions = filter(includes('SCH_ACT_'))

export default getActions
