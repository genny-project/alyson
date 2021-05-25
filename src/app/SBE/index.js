import { useSelector } from 'react-redux'
import { selectCode, selectRows } from 'redux/db/selectors'
import DashboardSearch from './display_modes/dashboard_search'
import HeroTask from './display_modes/hero_task'
import Agents from './display_modes/agents'
import Mentors from './display_modes/mentors'
import Mentees from './display_modes/mentees'

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
      {displayMode.value === 'agents' && <Agents sbeCode={sbeCode} rows={rows} />}
      {displayMode.value === 'our_mentees' && <Mentees sbeCode={sbeCode} rows={rows} />}
      {displayMode.value === 'our_mentors' && <Mentors sbeCode={sbeCode} />}
    </div>
  )
}

export default DisplaySbe
