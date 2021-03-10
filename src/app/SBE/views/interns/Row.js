import { Tr, Td } from '@chakra-ui/react'
import Cell from './Cell'
import { getAttribute } from 'app/SBE/utils/get-columns'
import BECard from 'app/BE/card'

const Row = ({ parentCode, code, columns, actions }) => {
  return (
    <Tr>
      <Td>
        <BECard
          parentCode={parentCode}
          code={code}
          columns={['PRI_NAME', 'PRI_ASSOC_INDUSTRY']}
          actions={actions}
          noExpansion
        />
      </Td>
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
