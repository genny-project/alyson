import { selectRows } from 'redux/db/selectors'
import { useSelector } from 'react-redux'
import { Tbody } from '@chakra-ui/react'
import Row from './Row'

const Body = ({ parentCode, columns, actions }) => {
  const rows = useSelector(selectRows(parentCode))

  return (
    <Tbody>
      {rows.map(row => (
        <Row key={row} parentCode={parentCode} code={row} columns={columns} actions={actions} />
      ))}
    </Tbody>
  )
}

export default Body
