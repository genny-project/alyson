import { useSelector } from 'react-redux'
import { selectCode } from 'redux/db/selectors'

const MyAgency = ({ sbeCode, rows }) => {
  const agency = rows[0]

  const agencyName = useSelector(selectCode(agency, 'PRI_NAME'))
  const validation = useSelector(selectCode(agency, 'PRI_VALIDATION'))

  return (
    <div>
      <p>{agencyName?.value}</p>
      <p>{validation?.value}</p>
    </div>
  )
}

export default MyAgency
