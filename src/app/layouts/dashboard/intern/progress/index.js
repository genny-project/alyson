import { useSelector } from 'react-redux'
// import { selectDashboard } from 'redux/app/selectors'
import { selectCode } from 'redux/db/selectors'

const Progress = ({ userCode }) => {
  const progress = useSelector(selectCode(userCode, 'PRI_PROGRESS'))

  // const dashboardSbes = useSelector(selectDashboard)

  if (!progress) return null
}

export default Progress
