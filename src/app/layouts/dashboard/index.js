import { useSelector } from 'react-redux'
import { selectDashboard } from 'redux/app/selectors'
import DisplaySbe from 'app/SBE'
const Dashboard = () => {
  const dashboardSbes = useSelector(selectDashboard)

  if (!dashboardSbes) return <div />
  return dashboardSbes.map(sbeCode => <DisplaySbe sbeCode={sbeCode} />)
}

export default Dashboard
