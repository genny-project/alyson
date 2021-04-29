import { useSelector } from 'react-redux'
import { selectCode, selectRows } from 'redux/db/selectors'
import DashboardSearch from './display_modes/dashboard_search'
import HeroTask from './display_modes/hero_task'

const DisplaySbe = ({ sbeCode }) => {
  const displayMode = useSelector(selectCode(sbeCode, 'SCH_DISPLAY_MODE'))
  const rows = useSelector(selectRows(sbeCode))

  if (!rows || !displayMode) return null

  return (
    <div>
      {displayMode.value === 'dashboard_search' && (
        <DashboardSearch sbeCode={sbeCode} rows={rows} />
      )}
      {displayMode.value === 'hero_task' && <HeroTask sbeCode={sbeCode} rows={rows} />}
    </div>
  )
}

export default DisplaySbe
