import { Th, Thead, Tr } from '@chakra-ui/react'

import Cell from './HeaderCell'

const Header = ({ columns, parentCode, actions }) => {
  return (
    <Thead>
      <Tr>
        {actions?.length ? <Th /> : null}
        {columns.map((col, index) => (
          <Cell key={`${parentCode}-${index}-${col}`} parentCode={parentCode} attribute={col} />
        ))}
      </Tr>
    </Thead>
  )
}

export default Header
