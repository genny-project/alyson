import { Th, Thead, Tr } from '@chakra-ui/react'

import Cell from './HeaderCell'

const Header = ({ columns, parentCode, actions, bgColor, dividerColor }) => (
  <Thead bgColor={bgColor}>
    <Tr>
      {actions?.length ? <Th borderColor={dividerColor} borderTopWidth="1px" /> : null}
      {columns.map((col, index) => (
        <Cell key={`${parentCode}-${index}-${col}`} parentCode={parentCode} attribute={col} />
      ))}
    </Tr>
  </Thead>
)

export default Header
