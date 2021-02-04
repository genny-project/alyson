import { Thead, Tr } from '@chakra-ui/react'
import Cell from './Cell'

const Header = ({ columns, parentCode }) => {
  return (
    <Thead>
      <Tr>
        {columns.map(col => (
          <Cell key={`${parentCode}-${col}`} showAttributeName code={parentCode} attribute={col} />
        ))}
      </Tr>
    </Thead>
  )
}

export default Header
