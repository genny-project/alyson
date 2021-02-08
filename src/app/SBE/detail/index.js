import { useSelector } from 'react-redux'
import { selectDetail } from 'redux/app/selectors'
import { selectCode } from 'redux/db/selectors'
import Cv from './cv'

const BaseEntityDetail = () => {
  const code = useSelector(selectDetail)
  const displayMode = useSelector(selectCode(code, 'SCH_DISPLAY_MODE'))

  return <Cv sbeCode={code} />
}

export default BaseEntityDetail
