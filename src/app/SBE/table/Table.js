import { useSelector } from 'react-redux'
import { Table, HStack, VStack, useColorModeValue, Box, Stack } from '@chakra-ui/react'
import Header from './Header'
import getColumns from '../utils/get-columns'
import getActions, { getTableActions } from '../utils/get-actions'
import { selectCode } from 'redux/db/selectors'
import Search from 'app/SBE/search/Search'
import Pagination from './Pagination'
import Body from './Body'
import Title from './Title'
import Filters from '../filters'
import Download from '../download'
import Action from 'app/BE/action'
import { useIsMobile } from 'utils/hooks'

const DataTable = ({ parentCode }) => {
  const tableData = useSelector(selectCode(parentCode))
  const bgColor = useColorModeValue('white', 'gray.700')

  const isMobile = useIsMobile()

  if (!tableData) return null

  const columns = getColumns(tableData)
  const actions = getActions(tableData)
  const tableActions = getTableActions(tableData)

  return (
    <Box mx="5">
      <HStack align="start" mb="4">
        <Stack align="end" spacing="7" direction={isMobile ? 'column' : 'row'}>
          <Title sbeCode={parentCode} />
          <Search sbeCode={parentCode} />
          <Filters sbeCode={parentCode} />
          <Download sbeCode={parentCode} />
        </Stack>
        <Pagination sbeCode={parentCode} />
        {tableActions && (
          <HStack>
            {tableActions.map(action => (
              <Action
                key={action}
                size="md"
                colorScheme="purple"
                parentCode={parentCode}
                code={action}
              />
            ))}
          </HStack>
        )}
      </HStack>

      <Table variant="simple" bg={bgColor} borderRadius="md" shadow="xs" size="sm">
        <Header columns={columns} parentCode={parentCode} actions={actions} />
        <Body columns={columns} parentCode={parentCode} actions={actions} />
      </Table>
    </Box>
  )
}

export default DataTable
