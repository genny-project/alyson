import { Tr } from '@chakra-ui/react'
import Cell from './Cell'
import { getAttribute } from 'app/SBE/utils/get-columns'

const Row = ({ parentCode, code, columns, actions }) => {
  return (
    <Tr>
      {columns.map(col => (
        <Cell
          actions={actions}
          parentCode={parentCode}
          key={`${code}-${col}`}
          code={code}
          attribute={getAttribute(col)}
        />
      ))}
    </Tr>
  )
}

export default Row
