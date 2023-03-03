import { Box, HStack, Table, Text, useColorModeValue, useTheme } from '@chakra-ui/react'
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
import { Iconly } from 'react-iconly'
import { useIsProductInternmatch } from 'utils/helpers/check-product-name'

const DataTable = ({ parentCode, mapSearch, passedComponents = [], userCode }) => {
  const {
    tableMarginX,
    tableBackgroundDarkColor,
    tableBackgroundLightColor,
    tableDividerColor,
  } = useProductColors()

  const isInternmatch = useIsProductInternmatch()
  const tableData = useSelector(selectCode(parentCode))
  const bgColor = useColorModeValue(tableBackgroundLightColor, tableBackgroundDarkColor)
  const isMobile = useIsMobile()
  const theme = useTheme()
  if (!tableData) return null

  const columns = getColumns(tableData)
  const actions = getActions(tableData)
  const tableActions = getTableActions(tableData)

  return (
    <Box mx={tableMarginX} my={5}>
      <HStack
        spacing={5}
        mx={5}
        mb={3}
        align="center"
        justifyContent={isMobile ? 'space-between' : 'flex-start'}
        borderColor={'gray.200'}
      >
        <HStack
          spacing="5"
          align="center"
          w={'full'}
          justifyContent={isMobile ? 'space-between' : 'flex-start'}
        >
          <Title sbeCode={parentCode} />
          {!isInternmatch &&
            passedComponents.map((component, index) => (
              <Box key={`TABLE-${parentCode}-CHILD-${index}`}>{component}</Box>
            ))}

          <Download sbeCode={parentCode} />
        </HStack>
        {isInternmatch && (
          <HStack>
            <HStack
              borderRadius={'md'}
              border="solid #063231 1px"
              paddingInline="3"
              paddingBlock="2"
              bg="#EDF8F8"
              color="#063231"
              w="15rem"
              mr={10}
            >
              <Iconly
                name="Search"
                set="two-tone"
                size="small"
                primaryColor={theme.colors.internmatch.primary}
              />
              <Text
                fontSize="1rem"
                fontWeight="300"
                lineHeight="1.2"
                fontFamily="'Inconsolata', sans-serif"
              >
                Search
              </Text>
            </HStack>

            <HStack w="7rem" color="#063231">
              <Iconly
                name="Filter2"
                set="two-tone"
                size="medium"
                primaryColor={theme.colors.internmatch.primary}
              />
              <Text fontSize="1.0rem" fontWeight="400">
                Filter By
              </Text>
            </HStack>
          </HStack>
        )}
        {!isInternmatch && <Pagination sbeCode={parentCode} />}
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
              bgColor={tableBackgroundLightColor}
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
