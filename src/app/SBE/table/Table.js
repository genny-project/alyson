import { useSelector } from 'react-redux'
import { Table, Tbody, Box, Heading, HStack } from '@chakra-ui/react'
import Row from './Row'
import Header from './Header'
import getColumns from '../utils/get-columns'
import getActions from '../utils/get-actions'
import { selectCode } from 'redux/db/selectors'
import Search from 'app/SBE/search/Search'

const DataTable = ({ parentCode, rows }) => {
  const tableData = useSelector(selectCode(parentCode))
  const title = useSelector(selectCode(parentCode, 'SCH_TITLE'))

  if (!tableData) return null

  const columns = getColumns(tableData)
  const actions = getActions(tableData)

  return (
    <Box m="2">
      <HStack>
        <Heading ml="5">{title?.value}</Heading>
        <Search sbeCode={parentCode} />
      </HStack>
      <Table>
        <Header columns={columns} parentCode={parentCode} />
        <Tbody>
          {rows.map(row => (
            <Row key={row} parentCode={parentCode} code={row} columns={columns} actions={actions} />
          ))}
        </Tbody>
      </Table>
    </Box>
  )
}

export default DataTable
