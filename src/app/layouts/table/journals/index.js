import { useSelector } from 'react-redux'
import { selectCode, selectRows } from 'redux/db/selectors'
import getActions, { getTableActions } from 'app/SBE/utils/get-actions'
import { Box, HStack, Text, VStack } from '@chakra-ui/layout'
import Journal from './Journal'
import Download from 'app/SBE/download'
import TableFooter from 'app/SBE/table/Footer'
import { Table } from '@chakra-ui/table'
import Action from 'app/BE/action'
import Card from 'app/layouts/components/card'

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

      <VStack>
        <Card w="44rem" maxW="89vw">
          <VStack>
            <Text textStyle="head.1">{`${title?.value}`}</Text>
            <Text textStyle="body.2">{`${rows?.length} Journals`}</Text>
            <Download sbeCode={sbeCode} />
            <HStack>
              {tableActions.map(action => (
                <Action
                  colorScheme="primary"
                  size="md"
                  key={action}
                  code={action}
                  parentCode={sbeCode}
                />
              ))}
            </HStack>
          </VStack>
        </Card>

        {rows.map(code => (
          <Journal key={code} code={code} actions={actions} parentCode={sbeCode} />
        ))}
      </VStack>
    </Box>
  )
}

export default Journals
