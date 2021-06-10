import { useSelector } from 'react-redux'
import { selectTable } from 'redux/app/selectors'
import Table from 'app/SBE/table/Table'
import { includes } from 'ramda'
import Journals from './journals'

const TableWrapper = ({ mapSearch }) => {
  const table = useSelector(selectTable)

  if (!table) return null

  if (includes('_JNLS_', table) || includes('_LOGBOOK_', table)) return <Journals sbeCode={table} />

  return <Table parentCode={table} />
}

export default TableWrapper
