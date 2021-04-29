import { useSelector } from 'react-redux'
import { selectTable } from 'redux/app/selectors'
import Table from 'app/SBE/table/Table'
import MapSearch from 'app/SBE/display_modes/map_search'

const TableWrapper = ({ mapSearch }) => {
  const table = useSelector(selectTable)

  if (!table) return null
  if (mapSearch) return <MapSearch parentCode={table} />
  return <Table parentCode={table} />
}

export default TableWrapper
