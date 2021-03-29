import { selectRows } from 'redux/db/selectors'
import { useSelector } from 'react-redux'
import { Tbody, Text, Tr, Td } from '@chakra-ui/react'
import Row from './Row'
import { FontAwesomeIcon } from '@fortawesome/react-fontawesome'
import { faBinoculars } from '@fortawesome/free-solid-svg-icons'

const Body = ({ parentCode, columns, actions }) => {
  const rows = useSelector(selectRows(parentCode))

  return rows.length ? (
    <Tbody>
      {rows.map(row => (
        <Row key={row} parentCode={parentCode} code={row} columns={columns} actions={actions} />
      ))}
    </Tbody>
  ) : (
    <Tbody>
      <Tr>
        <Td />
        <Td>
          <FontAwesomeIcon color="grey" icon={faBinoculars} size="3x" />
        </Td>
        <Td>
          <Text width="20rem">We looked, nothing seems to be here!</Text>
        </Td>
      </Tr>
    </Tbody>
  )
}

export default Body
