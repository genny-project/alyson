import { useSelector } from 'react-redux'
import { selectDashboard } from 'redux/app/selectors'
import DisplaySbe from 'app/SBE'
import DeveloperConsole from 'utils/developer'

const Dashboard = () => {
  const dashboardSbes = useSelector(selectDashboard)

  if (!dashboardSbes) return <div />
  return (
    <div>
      {dashboardSbes.map(sbeCode => (
        <DisplaySbe sbeCode={sbeCode} />
      ))}
      <DeveloperConsole />
    </div>
  )
}

export default Dashboard
