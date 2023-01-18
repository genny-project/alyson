import { Box, HStack, Table, useColorModeValue } from '@chakra-ui/react'
import getActions, { getTableActions } from '../utils/get-actions'

import Action from 'app/BE/action'
import Body from 'app/SBE/table/Body'
import Download from 'app/SBE/download'
import Header from 'app/SBE/table/Header'
import MapSearch from 'app/SBE/display_modes/map_view'
import Pagination from 'app/SBE/table/Pagination'
import Title from 'app/SBE/table/Title'
import { apiConfig } from 'config/get-api-config'
import { equals } from 'ramda'
import getColumns from 'app/SBE/utils/get-columns'
import { selectCode } from 'redux/db/selectors'
import { useIsMobile } from 'utils/hooks'
import { useSelector } from 'react-redux'
import Filters from 'app/SBE/filters'
import Search from 'app/SBE/search/Search'

const DataTable = ({ parentCode, mapSearch, passedComponents = [] }) => {
  const tableData = useSelector(selectCode(parentCode))
  const bgColor = useColorModeValue('white', 'gray.700')
  const isMobile = useIsMobile()

  if (!tableData) return null

  const columns = getColumns(tableData)
  const actions = getActions(tableData)
  const tableActions = getTableActions(tableData)

  const clientId = apiConfig?.clientId || 'alyson'

  return (
    <Box mx={'5'}>
      <HStack
        spacing={5}
        mb={3}
        pb={5}
        align="center"
        justifyContent={isMobile ? 'space-between' : 'flex-start'}
        borderBottom={'1px solid'}
        borderColor={'gray.200'}
      >
        <HStack
          spacing="5"
          align="center"
          w={'full'}
          justifyContent={isMobile ? 'space-between' : 'flex-start'}
        >
          <Title sbeCode={parentCode} />
          {<Search sbeCode={parentCode} sourceCode={parentCode} targetCode={parentCode} />}
          {<Filters sbeCode={parentCode} />}
          {passedComponents.map((component, index) => (
            <Box key={`TABLE-${parentCode}-CHILD-${index}`}>{component}</Box>
          ))}

          <Download sbeCode={parentCode} />
        </HStack>
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
