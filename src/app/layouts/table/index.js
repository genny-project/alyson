import { useSelector } from 'react-redux'
import { selectTable } from 'redux/app/selectors'
import Table from 'app/SBE/table/Table'
import MapSearch from 'app/SBE/display_modes/map_search'
import { selectCode } from 'redux/db/selectors'
import getUserType from 'utils/helpers/get-user-type'
import { includes } from 'ramda'
import InternInternshipSearch from './intern_internship'

const TableWrapper = ({ mapSearch }) => {
  const table = useSelector(selectTable)
  const userCode = useSelector(selectCode('USER'))
  const userType = getUserType(useSelector(selectCode(userCode)))

  if (!table) return null
  if (mapSearch) return <MapSearch parentCode={table} />

  if (includes('_INTERNSHIPS_', table) && userType === 'INTERN')
    return <InternInternshipSearch sbeCode={table} />

  return <Table parentCode={table} />
}

export default TableWrapper
