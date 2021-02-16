import { useSelector } from 'react-redux'
import { selectCode, selectRows } from 'redux/db/selectors'
import DashboardSearch from './display_modes/dashboard_search'
import HeroTask from './display_modes/hero_task'
import MyAgency from './display_modes/my_agency'
import OurInterns from './display_modes/our_interns'
import MyCompany from './display_modes/my_company'
import MyProfile from './display_modes/my_profile'
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
      {displayMode.value === 'my_agency' && <MyAgency sbeCode={sbeCode} rows={rows} />}
      {displayMode.value === 'our_interns' && <OurInterns sbeCode={sbeCode} />}
      {displayMode.value === 'my_company' && <MyCompany sbeCode={sbeCode} rows={rows} />}
      {displayMode.value === 'my_profile' && <MyProfile sbeCode={sbeCode} rows={rows} />}
    </div>
  )
}

export default DisplaySbe
