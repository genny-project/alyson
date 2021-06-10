import { Thead, Tr, Th } from '@chakra-ui/react'
import Cell from './HeaderCell'

const Header = ({ columns, parentCode, actions, tableActions }) => {
  return (
    <Thead>
      <Tr>
        {actions?.length ? <Th /> : null}
        {columns.map(col => (
          <Cell key={`${parentCode}-${col}`} parentCode={parentCode} attribute={col} />
        ))}
      </Tr>
    </Thead>
  )
}

export default Header
