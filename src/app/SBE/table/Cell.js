import { Th, Td } from '@chakra-ui/react'
import { useSelector } from 'react-redux'
import { selectCode } from 'redux/db/selectors'
import Attribute from 'app/BE/attribute'
import ContextMenu from 'app/BE/context'

const Cell = ({ code, attribute, showAttributeName, actions, parentCode }) => {
  const data = useSelector(selectCode(code, attribute))

  return showAttributeName ? (
    <Th>{data?.attributeName}</Th>
  ) : (
    <Td>
      <ContextMenu actions={actions} code={code} parentCode={parentCode}>
        <Attribute code={code} attribute={attribute} />
      </ContextMenu>
    </Td>
  )
}

export default Cell
