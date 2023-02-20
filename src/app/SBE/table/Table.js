import { Box, HStack, Table, useColorModeValue } from '@chakra-ui/react'
import getActions, { getTableActions } from '../utils/get-actions'

import Action from 'app/BE/action'
import Body from 'app/SBE/table/Body'
import Download from 'app/SBE/download'
import Header from 'app/SBE/table/Header'
import MapSearch from 'app/SBE/display_modes/map_view'
import Pagination from 'app/SBE/table/Pagination'
import Title from 'app/SBE/table/Title'
import getColumns from 'app/SBE/utils/get-columns'
import { selectCode } from 'redux/db/selectors'
import { useIsMobile } from 'utils/hooks'
import { useSelector } from 'react-redux'
import useProductColors from 'utils/productColors'

const DataTable = ({ parentCode, mapSearch, passedComponents = [], userCode }) => {
  const {
    tableMarginX,
    tableBackgroundDarkColor,
    tableBackgroundLightColor,
    tableDividerColor,
  } = useProductColors()
  const tableData = useSelector(selectCode(parentCode))
  const bgColor = useColorModeValue(tableBackgroundLightColor, tableBackgroundDarkColor)
  const isMobile = useIsMobile()

  if (!tableData) return null

  const columns = getColumns(tableData)
  const actions = getActions(tableData)
  const tableActions = getTableActions(tableData)

  return (
    <Box mx={tableMarginX}>
      <HStack
        spacing={5}
        mx={5}
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
            variant={'simple'}
            bgColor={bgColor}
            color="product.darkAlpha50"
            borderRadius="md"
            shadow="xs"
            size="sm"
          >
            <Header
              columns={columns}
              parentCode={parentCode}
              actions={actions}
              dividerColor={tableDividerColor}
              bgColor={tableBackgroundDarkColor}
            />
            <Body
              columns={columns}
              parentCode={parentCode}
              actions={actions}
              colSpan={columns.length}
              dividerColor={tableDividerColor}
              bgColorLight={tableBackgroundLightColor}
              bgColorDark={tableBackgroundDarkColor}
            />
          </Table>
        </Box>
      )}
    </Box>
  )
}

export default DataTable
