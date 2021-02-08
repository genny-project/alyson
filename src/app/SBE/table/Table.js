import { useSelector } from 'react-redux'
import { Table, Box, HStack } from '@chakra-ui/react'
import Header from './Header'
import getColumns from '../utils/get-columns'
import getActions from '../utils/get-actions'
import { selectCode } from 'redux/db/selectors'
import Search from 'app/SBE/search/Search'
import Footer from './Footer'
import Body from './Body'
import Title from './Title'

const DataTable = ({ parentCode }) => {
  const tableData = useSelector(selectCode(parentCode))

  if (!tableData) return null

  const columns = getColumns(tableData)
  const actions = getActions(tableData)

  return (
    <Box m="2">
      <HStack>
        <Title sbeCode={parentCode} />
        <Search sbeCode={parentCode} />
      </HStack>
      <Table>
        <Header columns={columns} parentCode={parentCode} actions={actions} />
        <Body columns={columns} parentCode={parentCode} actions={actions} />
        <Footer sbeCode={parentCode} />
      </Table>
    </Box>
  )
}

export default DataTable
