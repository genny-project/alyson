import { useSelector } from 'react-redux'
import { selectCode, selectRows } from 'redux/db/selectors'
import DashboardSearch from './display_modes/dashboard_search'
import HeroTask from './display_modes/hero_task'
import MyAgency from './display_modes/my_agency'
import OurInterns from './display_modes/our_interns'
import MyCompany from './display_modes/my_company'
import MyProfile from './display_modes/my_profile'
import MyInternship from './display_modes/my_internship'
import MyEducationProvider from './display_modes/my_education_provider'
import OurEduProReps from './display_modes/edu_pro_reps'
import Agents from './display_modes/agents'
import MentorAgent from './display_modes/agents'
import Mentors from './display_modes/mentors'
import Mentees from './display_modes/mentees'
import { useGetRealm } from 'utils/hooks'

const DisplaySbe = ({ sbeCode }) => {
  const allSbe = useSelector(selectCode(sbeCode))
  const displayMode = useSelector(selectCode(sbeCode, 'SCH_DISPLAY_MODE'))
  const rows = useSelector(selectRows(sbeCode))
  const realm = useGetRealm()

  console.log({ sbeCode, allSbe })

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
      {displayMode.value === 'my_internship' && <MyInternship sbeCode={sbeCode} rows={rows} />}
      {displayMode.value === 'edu_pro_reps' && <OurEduProReps sbeCode={sbeCode} rows={rows} />}
      {displayMode.value === 'my_education_provider' && (
        <MyEducationProvider sbeCode={sbeCode} rows={rows} />
      )}
      {displayMode.value === 'edu_pro_summary_count' && (
        <DashboardSearch sbeCode={sbeCode} rows={rows} />
      )}
      {displayMode.value === 'agents' && realm === 'mentormatch' && (
        <MentorAgent sbeCode={sbeCode} rows={rows} />
      )}
      {displayMode.value === 'agents' && realm !== 'mentormatch' && (
        <Agents sbeCode={sbeCode} rows={rows} />
      )}
      {displayMode.value === 'our_mentees' && <Mentees sbeCode={sbeCode} rows={rows} />}
      {displayMode.value === 'our_mentors' && <Mentors sbeCode={sbeCode} />}
    </div>
  )
}

export default DisplaySbe
