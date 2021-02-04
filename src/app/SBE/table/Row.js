import { Tr } from '@chakra-ui/react'
import Cell from './Cell'
import { getAttribute } from 'app/SBE/utils/get-columns'
// import ContextMenu from 'app/BE/context'

const Row = ({ parentCode, code, columns, actions }) => {
  // const classes = useStyles()

  return (
    <Tr>
      {columns.map(col => (
        <Cell key={`${code}-${col}`} code={code} attribute={getAttribute(col)} />
      ))}
    </Tr>
    // <ContextMenu actions={actions} code={code} parentCode={parentCode}>
    // </ContextMenu>
  )
}

export default Row
