import { Td } from '@chakra-ui/react'
import './table.css'

import Attribute from 'app/BE/attribute'
import useProductColors from 'utils/productColors'

const Cell = ({ code, attribute, parentCode, dividerColor }) => {
  const { tableCellCSS } = useProductColors()

  return (
    <Td px={tableCellCSS} borderColor={dividerColor}>
      <Attribute parentCode={parentCode} code={code} attribute={attribute} mini />
    </Td>
  )
}

export default Cell
