import { useSelector } from 'react-redux'
import { selectDetail } from 'redux/app/selectors'
import { selectCode } from 'redux/db/selectors'
import Cv from './cv'

const BaseEntityDetail = () => {
  const code = useSelector(selectDetail)
  const displayMode = useSelector(selectCode(code, 'SCH_DISPLAY_MODE'))

  if (!displayMode) return null
  return displayMode.value === 'cv' ? <Cv sbeCode={code} /> : <div>{displayMode.value}</div>
}

export default BaseEntityDetail
