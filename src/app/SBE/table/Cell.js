import { Td } from '@chakra-ui/react'
import './table.css'

import Attribute from 'app/BE/attribute'

const Cell = ({ code, attribute, parentCode, dividerColor }) => (
  <Td className="cell" borderColor={dividerColor}>
    <Attribute parentCode={parentCode} code={code} attribute={attribute} mini />
  </Td>
)

export default Cell
