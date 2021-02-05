import { useSelector } from 'react-redux'
import { selectCode } from 'redux/db/selectors'

const DisplaySbe = ({ sbeCode }) => {
  const displayMode = useSelector(selectCode(sbeCode, 'SCH_DISPLAY_MODE'))

  console.log(displayMode)

  return <div>{displayMode?.value}</div>
}

export default DisplaySbe
