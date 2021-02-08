import { useSelector } from 'react-redux'
import { selectCode } from 'redux/db/selectors'

const BaseEntityDetail = ({ code }) => {
  const displayMode = useSelector(selectCode(code, 'SCH_DISPLAY_MODE'))

  return <div>{displayMode}</div>
}

export default BaseEntityDetail
