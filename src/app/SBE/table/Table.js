import { Box, HStack, Stack, Table, useColorModeValue } from '@chakra-ui/react'
import getActions, { getTableActions } from '../utils/get-actions'

import Action from 'app/BE/action'
import Body from './Body'
import Download from '../download'
import Filters from '../filters'
import Header from './Header'
import MapSearch from 'app/SBE/display_modes/map_view'
import Pagination from './Pagination'
import Search from 'app/SBE/search/Search'
import Title from './Title'
import { apiConfig } from 'config/get-api-config'
import { equals } from 'ramda'
import getColumns from '../utils/get-columns'
import { selectCode } from 'redux/db/selectors'
import { useIsMobile } from 'utils/hooks'
import { useSelector } from 'react-redux'

const DataTable = ({ parentCode, mapSearch }) => {
  const tableData = useSelector(selectCode(parentCode))
  const bgColor = useColorModeValue('white', 'gray.700')

  const isMobile = useIsMobile()

  if (!tableData) return null

  const columns = getColumns(tableData)
  const actions = getActions(tableData)
  const tableActions = getTableActions(tableData)

  const clientId = apiConfig?.clientId || 'alyson'

  return (
    <Box mx={equals(clientId)('lojing') ? '0' : '5'}>
      <HStack align="flex-end" mb="3" justify="space-between">
        <Stack
          align="flex-start"
          alignItems={'center'}
          spacing="7"
          direction={isMobile ? 'column' : 'row'}
        >
          <Title sbeCode={parentCode} />
          <Search sbeCode={parentCode} />
          <Filters sbeCode={parentCode} />
          <Download sbeCode={parentCode} />
        </Stack>
        <Pagination sbeCode={parentCode} />
      </HStack>

      {!mapSearch && tableActions && (
        <HStack mb="3">
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
      {mapSearch ? (
        <MapSearch parentCode={parentCode} />
      ) : (
        <Box maxW={'full'} overflow={'auto'}>
          <Table
            variant={equals(clientId)('lojing') ? 'striped' : 'simple'}
            bg={bgColor}
            color="product.darkAlpha50"
            borderRadius="md"
            shadow="xs"
            size="sm"
          >
            <Header columns={columns} parentCode={parentCode} actions={actions} />
            <Body
              columns={columns}
              parentCode={parentCode}
              actions={actions}
              colSpan={columns.length}
            />
          </Table>
        </Box>
      )}
    </Box>
  )
}

export default DataTable
