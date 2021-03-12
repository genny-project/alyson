import { useSelector } from 'react-redux'
import { selectRows } from 'redux/db/selectors'
import { VStack } from '@chakra-ui/react'
import getColumns from 'app/SBE/utils/get-columns'
import getActions from 'app/SBE/utils/get-actions'
import { selectCode } from 'redux/db/selectors'

import Card from './Card'

const Cards = ({ parentCode }) => {
  const tableData = useSelector(selectCode(parentCode))
  const rows = useSelector(selectRows(parentCode))

  if (!tableData) return null

  const columns = getColumns(tableData)
  const actions = getActions(tableData)

  return (
    <VStack ml="4" alignItems="start">
      {rows.slice(0, 10).map(code => (
        <Card key={code} code={code} parentCode={parentCode} actions={actions} columns={columns} />
      ))}
    </VStack>
  )
}

export default Cards
