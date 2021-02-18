import { useSelector } from 'react-redux'
import { selectRows } from 'redux/db/selectors'
import { Grid, Box, HStack, VStack } from '@chakra-ui/react'
import getColumns from 'app/SBE/utils/get-columns'
import getActions from 'app/SBE/utils/get-actions'
import { selectCode } from 'redux/db/selectors'
import Search from 'app/SBE/search/Search'
import Title from 'app/SBE/table/Title'
import Filters from 'app/SBE/filters'
import Card from './Card'
import Map from './Map'

const MapSearch = ({ parentCode }) => {
  const tableData = useSelector(selectCode(parentCode))
  const rows = useSelector(selectRows(parentCode))

  if (!tableData) return null

  const columns = getColumns(tableData)
  const actions = getActions(tableData)

  return (
    <VStack m="10" alignItems="left">
      <HStack mb="3">
        <Title sbeCode={parentCode} />
        <Search sbeCode={parentCode} />
        <Filters sbeCode={parentCode} />
      </HStack>
      <HStack alignItems="start">
        <VStack>
          {rows.map(code => (
            <Card
              key={code}
              code={code}
              parentCode={parentCode}
              actions={actions}
              columns={columns}
            />
          ))}
        </VStack>
        <Map rows={rows} />
      </HStack>
    </VStack>
  )
}

export default MapSearch
