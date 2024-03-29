import { useSelector } from 'react-redux'
import { selectCode } from 'redux/db/selectors'
import getActions from 'app/SBE/utils/get-actions'
import getColumns from 'app/SBE/utils/get-columns'
import Card from 'app/BE/card'

const MyProfile = ({ rows, sbeCode }) => {
  const profile = rows[0]

  const sbe = useSelector(selectCode(sbeCode))
  const actions = getActions(sbe)
  const columns = getColumns(sbe)

  return <Card code={profile} parentCode={sbeCode} actions={actions} columns={columns} />
}

export default MyProfile
