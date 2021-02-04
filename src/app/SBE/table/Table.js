import { useSelector } from 'react-redux'
import { Table, Tbody } from '@chakra-ui/react'
import Row from './Row'
import Header from './Header'
import getColumns from '../utils/get-columns'
import getActions from '../utils/get-actions'
import { selectCode } from 'redux/db/selectors'

const DataTable = ({ parentCode, rows }) => {
  const tableData = useSelector(selectCode(parentCode))

  if (!tableData) return null

  const columns = getColumns(tableData)
  const actions = getActions(tableData)

  return (
    <Table>
      <Header columns={columns} parentCode={parentCode} />
      <Tbody>
        {rows.map(row => (
          <Row key={row} parentCode={parentCode} code={row} columns={columns} actions={actions} />
        ))}
      </Tbody>
    </Table>
  )
}

export default DataTable
