import { Td, Tr } from '@chakra-ui/react'

import Cell from './Cell'
import ContextMenu from 'app/BE/context'
import { FontAwesomeIcon } from '@fortawesome/react-fontawesome'
import { faEllipsisV } from '@fortawesome/free-solid-svg-icons'
import { getAttribute } from 'app/SBE/utils/get-columns'

const Row = ({ parentCode, code, columns, actions, bgColor, dividerColor }) => (
  <Tr bgColor={bgColor}>
    {actions?.length ? (
      <Td borderColor={dividerColor}>
        <ContextMenu
          actions={actions}
          code={code}
          parentCode={parentCode}
          button={<FontAwesomeIcon color="grey" icon={faEllipsisV} />}
        />
      </Td>
    ) : null}
    {columns.map(col => (
      <Cell
        actions={actions}
        parentCode={parentCode}
        key={`${code}-${col}`}
        code={code}
        attribute={getAttribute(col)}
        dividerColor={dividerColor}
      />
    ))}
  </Tr>
)

export default Row
