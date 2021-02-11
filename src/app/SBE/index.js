import { useSelector } from 'react-redux'
import { selectCode, selectRows } from 'redux/db/selectors'
import HeroTask from './display_modes/hero_task'
import MyAgency from './display_modes/my_agency'
import OurInterns from './display_modes/our_interns'

const DisplaySbe = ({ sbeCode }) => {
  const displayMode = useSelector(selectCode(sbeCode, 'SCH_DISPLAY_MODE'))
  const rows = useSelector(selectRows(sbeCode))

  if (!rows || !displayMode) return null

  console.log(displayMode)

  return (
    <div>
      {displayMode.value === 'hero_task' && <HeroTask sbeCode={sbeCode} rows={rows} />}
      {displayMode.value === 'my_agency' && <MyAgency sbeCode={sbeCode} rows={rows} />}
      {displayMode.value === 'our_interns' && <OurInterns sbeCode={sbeCode} />}
    </div>
  )
}

export default DisplaySbe
