import { IconButton, Td, Tr } from '@chakra-ui/react'

import Cell from './Cell'
import ContextMenu from 'app/BE/context'
import { FontAwesomeIcon } from '@fortawesome/react-fontawesome'
import { faEllipsisV } from '@fortawesome/free-solid-svg-icons'
import { getAttribute } from 'app/SBE/utils/get-columns'

const Row = ({ parentCode, code, columns, actions }) => {
  return (
    <Tr>
      {actions?.length ? (
        <Td>
          <ContextMenu
            actions={actions}
            code={code}
            parentCode={parentCode}
            button={<IconButton variant="ghost" icon={<FontAwesomeIcon icon={faEllipsisV} />} />}
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
        />
      ))}
    </Tr>
  )
}

export default Row
