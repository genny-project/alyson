import InternInternshipSearch from './intern_internship'
import Journals from './journals'
import Table from 'app/SBE/table/Table'
import getUserType from 'utils/helpers/get-user-type'
import { includes } from 'ramda'
import { selectCode } from 'redux/db/selectors'
import { useSelector } from 'react-redux'
import debugOut from 'utils/debug-out'

const TableWrapper = ({ mapSearch, passedComponents = [], tableCode: table }) => {
  const userCode = useSelector(selectCode('USER'))
  const userType = getUserType(useSelector(selectCode(userCode)))

  if (!table) {
    debugOut.error('Got null table!')
    return null
  }

  if (includes('_INTERNSHIPS_', table) && userType === 'INTERN')
    return <InternInternshipSearch sbeCode={table} />

  if (includes('_JNLS_', table) || includes('_LOGBOOK_', table)) return <Journals sbeCode={table} />

  return <Table parentCode={table} mapSearch={mapSearch} passedComponents={passedComponents} />
}

export default TableWrapper
