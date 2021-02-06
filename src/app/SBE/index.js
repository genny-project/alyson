import { useSelector } from 'react-redux'
import { selectCode, selectRows } from 'redux/db/selectors'
import MyAgency from './display_modes/my_agency'

const DisplaySbe = ({ sbeCode }) => {
  const displayMode = useSelector(selectCode(sbeCode, 'SCH_DISPLAY_MODE'))
  const rows = useSelector(selectRows(sbeCode))

  if (!rows || !displayMode) return null

  return (
    <div>{displayMode.value === 'my_agency' && <MyAgency sbeCode={sbeCode} rows={rows} />}</div>
  )
}

export default DisplaySbe
