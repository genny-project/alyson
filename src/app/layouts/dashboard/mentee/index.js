import { useSelector } from 'react-redux'
import { selectCode } from 'redux/db/selectors'
import LinkedApp from './linked_app'

const MenteeDashboard = () => {
  const userCode = useSelector(selectCode('USER'))
  const linkedApp = useSelector(selectCode(userCode, 'PRI_APP_LNK_CODE'))

  if (linkedApp?.value) return <LinkedApp code={linkedApp.value} />
  return null
}

export default MenteeDashboard
