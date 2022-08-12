import { HStack, Tbody, Td, Text, Tr } from '@chakra-ui/react'

import { FontAwesomeIcon } from '@fortawesome/react-fontawesome'
import Row from './Row'
import { faBinoculars } from '@fortawesome/free-solid-svg-icons'
import { selectRows } from 'redux/db/selectors'
import { useSelector } from 'react-redux'

const Body = ({ parentCode, columns, actions, colSpan }) => {
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
        <Td colSpan={colSpan}>
          <HStack alignItems={'center'}>
            <FontAwesomeIcon color="grey" icon={faBinoculars} size="2x" />
            <Text as="span" ml={1}>
              We looked, nothing seems to be here!
            </Text>
          </HStack>
        </Td>
      </Tr>
    </Tbody>
  )
}

export default Body
