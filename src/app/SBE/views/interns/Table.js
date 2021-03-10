import { useSelector } from 'react-redux'
import { Table, Box, HStack } from '@chakra-ui/react'
import Header from './Header'
import getActions, { getTableActions } from 'app/SBE/utils/get-actions'
import { selectCode } from 'redux/db/selectors'
import Search from 'app/SBE/search/Search'
import Footer from 'app/SBE/table/Footer'
import Body from './Body'
import Title from 'app/SBE/table/Title'
import Filters from 'app/SBE/filters'
import Download from 'app/SBE/download'
import Action from 'app/BE/action'

const INTERNS_COLUMNS = [
  'COL_PRI_ASSOC_EP',
  'COL_PRI_NUM_JOURNALS',
  'COL_PRI_JOURNAL_STATUS',
  'COL_PRI_START_DATE',
  'COL_PRI_ASSOC_DURATION',
  'COL_PRI_DAYS_PER_WEEK',
  'COL_PRI_STUDENT_ID',
  'COL_PRI_ASSOC_OCCUPATION',
  'COL_PRI_VIDEO_URL',
  'COL_PRI_LINKEDIN_URL',
  'COL_PRI_CV',
]

const InternsTable = ({ parentCode }) => {
  const tableData = useSelector(selectCode(parentCode))

  if (!tableData) return null

  const columns = INTERNS_COLUMNS
  const actions = getActions(tableData)
  const tableActions = getTableActions(tableData)

  return (
    <Box m="2">
      <HStack>
        <Title sbeCode={parentCode} />
        <Search sbeCode={parentCode} />
        <Filters sbeCode={parentCode} />
        <Download sbeCode={parentCode} />
      </HStack>
      <HStack m="5">
        {tableActions &&
          tableActions.map(action => (
            <Action
              key={action}
              size="md"
              colorScheme="purple"
              parentCode={parentCode}
              code={action}
            />
          ))}
      </HStack>
      <Table>
        <Header parentCode={parentCode} columns={INTERNS_COLUMNS} />
        <Body columns={columns} parentCode={parentCode} actions={actions} />
        <Footer sbeCode={parentCode} />
      </Table>
    </Box>
  )
}

export default InternsTable
