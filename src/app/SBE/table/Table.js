import { includes } from 'ramda'
import { useSelector } from 'react-redux'
import { Table, Box, HStack } from '@chakra-ui/react'
import Header from './Header'
import getColumns from '../utils/get-columns'
import getActions, { getTableActions } from '../utils/get-actions'
import { selectCode } from 'redux/db/selectors'
import Search from 'app/SBE/search/Search'
import Footer from './Footer'
import Body from './Body'
import Title from './Title'
import Filters from '../filters'
import Download from '../download'
import Action from 'app/BE/action'

const DataTable = ({ parentCode }) => {
  const tableData = useSelector(selectCode(parentCode))

  if (!tableData) return null

  const columns = getColumns(tableData)
  const actions = getActions(tableData)
  const tableActions = getTableActions(tableData)

  return (
    <Box p="2">
      <HStack>
        <Title sbeCode={parentCode} />
        <Search sbeCode={parentCode} />
        <Filters sbeCode={parentCode} />
        <Download sbeCode={parentCode} />
      </HStack>
      <HStack p="5">
        {tableActions &&
          tableActions.map(action => (
            <Action
              key={action}
              size="md"
              colorScheme="purple"
              parentCode={parentCode}
              code={action}
            />
          ))}
      </HStack>
      <Table position="relative">
        <Header columns={columns} parentCode={parentCode} actions={actions} />
        <Body columns={columns} parentCode={parentCode} actions={actions} />
        <Footer sbeCode={parentCode} />
      </Table>
    </Box>
  )
}

export default DataTable
