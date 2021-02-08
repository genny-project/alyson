import { useSelector } from 'react-redux'
import { selectRows, selectCode } from 'redux/db/selectors'
import { VStack } from '@chakra-ui/react'
import getColumns from '../utils/get-columns'
import getActions from '../utils/get-actions'
import ContextMenu from 'app/BE/context'
import BECard from 'app/BE/card'
import Title from './Title'

const Lane = ({ sbeCode }) => {
  const table = useSelector(selectCode(sbeCode))
  const rows = useSelector(selectRows(sbeCode))

  if (!table) return null

  const columns = getColumns(table)
  const actions = getActions(table)

  return (
    <VStack>
      <Title sbeCode={sbeCode} />
      {rows.map(row => (
        <BECard columns={columns} code={row} parentCode={sbeCode} />
      ))}
    </VStack>
  )
}

export default Lane
