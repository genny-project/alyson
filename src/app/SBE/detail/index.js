import { useSelector } from 'react-redux'
import { selectDetail } from 'redux/app/selectors'
import { selectCode } from 'redux/db/selectors'
import Cv from './cv'
import getDetailType from './helpers/get-detail-type'

const BaseEntityDetail = () => {
  const code = useSelector(selectDetail)
  const displayMode = useSelector(selectCode(code, 'SCH_DISPLAY_MODE'))

  const displayType = getDetailType(displayMode?.value)
  console.warn({ displayType })

  if (displayType === 'CV') {
    return <Cv sbeCode={code} />
  }

  return <Cv sbeCode={code} />
}

export default BaseEntityDetail
