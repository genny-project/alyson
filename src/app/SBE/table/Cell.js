import { Td } from '@chakra-ui/react'

import Attribute from 'app/BE/attribute'

const Cell = ({ code, attribute, parentCode, dividerColor }) => (
  <Td borderColor={dividerColor} paddingX={10}>
    <Attribute parentCode={parentCode} code={code} attribute={attribute} mini />
  </Td>
)

export default Cell
