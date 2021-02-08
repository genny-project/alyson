import { Thead, Tr, Th } from '@chakra-ui/react'
import Cell from './Cell'

const Header = ({ columns, parentCode, actions }) => {
  return (
    <Thead>
      <Tr>
        {actions?.length && <Th />}
        {columns.map(col => (
          <Cell key={`${parentCode}-${col}`} showAttributeName code={parentCode} attribute={col} />
        ))}
      </Tr>
    </Thead>
  )
}

export default Header
