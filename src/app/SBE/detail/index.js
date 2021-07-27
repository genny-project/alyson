import { useSelector } from 'react-redux'
import { selectDetail } from 'redux/app/selectors'
import { selectCode } from 'redux/db/selectors'
import DefaultView from './default-view'
import getDetailType from './helpers/get-detail-type'
import { head } from 'ramda'

const BaseEntityDetail = ({ targetCode, defaultView }) => {
  const code = useSelector(selectDetail)
  const displayMode = useSelector(selectCode(code, 'SCH_DISPLAY_MODE'))
  const displayType = getDetailType(displayMode?.value)

  const beCode = head(useSelector(selectCode(code, 'rows')) || [targetCode])

  if (defaultView || displayType) return <DefaultView sbeCode={code} targetCode={beCode} />

  return <DefaultView sbeCode={code} targetCode={beCode} />
}

export default BaseEntityDetail
