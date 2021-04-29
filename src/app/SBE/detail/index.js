import { useSelector } from 'react-redux'
import { selectDetail } from 'redux/app/selectors'
import DefaultView from './default-view'

const BaseEntityDetail = ({ targetCode, defaultView }) => {
  const code = useSelector(selectDetail)

  if (defaultView) return <DefaultView sbeCode={code} targetCode={targetCode} />

  return <DefaultView sbeCode={code} targetCode={targetCode} />
}

export default BaseEntityDetail
