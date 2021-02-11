import { useCallback } from 'react'
import { useSelector } from 'react-redux'
import { selectRows, selectCode } from 'redux/db/selectors'
import { VStack, Button } from '@chakra-ui/react'
import getColumns from '../utils/get-columns'
import getActions from '../utils/get-actions'
import BECard from 'app/BE/card'
import Title from './Title'
import getPaginationActions from 'app/SBE/utils/get-pagination-actions'

const Lane = ({ sbeCode }) => {
  const table = useSelector(selectCode(sbeCode))
  const rows = useSelector(selectRows(sbeCode))
  const totalResults = useSelector(selectCode(sbeCode, 'PRI_TOTAL_RESULTS'))
  const paginationActions = useCallback(() => getPaginationActions(sbeCode), [sbeCode])

  if (!table) return null

  const columns = getColumns(table)
  const actions = getActions(table)

  return (
    <VStack bg="blue.50" p="3" borderRadius="lg" shadow="lg">
      <Title sbeCode={sbeCode} />
      {rows.map(row => (
        <BECard columns={columns} actions={actions} code={row} parentCode={sbeCode} />
      ))}
      {rows.length < totalResults.value && (
        <Button onClick={paginationActions().lazy}>{`See ${
          totalResults.value - rows.length
        } more`}</Button>
      )}
    </VStack>
  )
}

export default Lane
