import { Thead, Tr, Th } from '@chakra-ui/react'
import Cell from './HeaderCell'

const Header = ({ columns, parentCode }) => {
  return (
    <Thead>
      <Tr>
        <Th>Intern</Th>
        {columns.map(col => (
          <Cell key={`${parentCode}-${col}`} attribute={col} parentCode={parentCode} />
        ))}
      </Tr>
    </Thead>
  )
}

export default Header
