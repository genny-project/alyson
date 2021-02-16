import { useSelector } from 'react-redux'
import { selectRows } from 'redux/db/selectors'
import { Grid, Box, HStack } from '@chakra-ui/react'
import getColumns from 'app/SBE/utils/get-columns'
import getActions from 'app/SBE/utils/get-actions'
import { selectCode } from 'redux/db/selectors'
import Search from 'app/SBE/search/Search'
import Title from 'app/SBE/table/Title'
import Filters from 'app/SBE/filters'
import BECard from 'app/BE/card'

const HeroSearch = ({ parentCode }) => {
  const tableData = useSelector(selectCode(parentCode))
  const rows = useSelector(selectRows(parentCode))

  if (!tableData) return null

  const columns = getColumns(tableData)
  const actions = getActions(tableData)

  return (
    <Box>
      <HStack>
        <Title sbeCode={parentCode} />
        <Search sbeCode={parentCode} />
        <Filters sbeCode={parentCode} />
      </HStack>
      <Grid h="200px" templateRows="repeat(2, 1fr)" templateColumns="repeat(5, 1fr)" gap={4}>
        {rows.map(code => (
          <Grid key={code} item>
            <BECard code={code} parentCode={parentCode} actions={actions} columns={columns} />
          </Grid>
        ))}
      </Grid>
    </Box>
  )
}

export default HeroSearch
