import { useSelector } from 'react-redux'
import { selectCode, selectRows } from 'redux/db/selectors'
import getActions from 'app/SBE/utils/get-actions'
import { Box, Center, Divider, HStack, Text, VStack } from '@chakra-ui/layout'
import Journal from './Journal'
import Download from 'app/SBE/download'
import TableFooter from 'app/SBE/table/Footer'
import { Table } from '@chakra-ui/table'

const Journals = ({ sbeCode }) => {
  const tableData = useSelector(selectCode(sbeCode))

  const rows = useSelector(selectRows(sbeCode))
  const actions = getActions(tableData)
  const title = useSelector(selectCode(sbeCode, 'SCH_TITLE'))

  return (
    <Box p="3">
      <Table>
        <TableFooter sbeCode={sbeCode} />
      </Table>

      <VStack>
        <VStack m="3">
          <Text fontWeight="semibold" fontSize="lg">{`${title?.value} - Journals`}</Text>
          <Download sbeCode={sbeCode} />
        </VStack>
        {rows.map(code => (
          <VStack key={code}>
            <Journal code={code} actions={actions} parentCode={sbeCode} />
            <Divider w="50%" />
          </VStack>
        ))}
      </VStack>
    </Box>
  )
}

export default Journals
