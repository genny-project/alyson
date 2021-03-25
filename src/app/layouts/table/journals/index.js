import { useSelector } from 'react-redux'
import { selectCode, selectRows } from 'redux/db/selectors'
import getActions, { getTableActions } from 'app/SBE/utils/get-actions'
import { Box, Divider, HStack, Text } from '@chakra-ui/layout'
import Journal from './Journal'
import Download from 'app/SBE/download'
import Title from 'app/SBE/lane/Title'
import TableFooter from 'app/SBE/table/Footer'
import { Table } from '@chakra-ui/table'

const Journals = ({ sbeCode }) => {
  const tableData = useSelector(selectCode(sbeCode))

  const rows = useSelector(selectRows(sbeCode))
  const actions = getActions(tableData)
  const tableActions = getTableActions(tableData)
  const title = useSelector(selectCode(sbeCode, 'SCH_TITLE'))

  return (
    <Box p="3">
      <Table>
        <TableFooter sbeCode={sbeCode} />
      </Table>
      <HStack m="3" spacing="5">
        <Text fontWeight="semibold" fontSize="lg">{`${title?.value} - Journals`}</Text>
        <Download sbeCode={sbeCode} />
      </HStack>

      {rows.map(code => (
        <Box key={code}>
          <Journal code={code} actions={actions} />
          <Divider orientation="horizontal" w="50%" />
        </Box>
      ))}
    </Box>
  )
}

export default Journals
