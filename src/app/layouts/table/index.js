import { useSelector } from 'react-redux'
import { selectTable } from 'redux/app/selectors'
import Table from '../../SBE/table/Table'

const TableWrapper = () => {
  const table = useSelector(selectTable)

  if (!table) return null

  return <Table parentCode={table} />
}

export default TableWrapper
