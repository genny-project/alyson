import { Th, Td } from '@chakra-ui/react'
import { useSelector } from 'react-redux'
import { selectCode } from 'redux/db/selectors'
import Attribute from 'app/BE/attribute'

const Cell = ({ code, attribute, showAttributeName }) => {
  const data = useSelector(selectCode(code, attribute))

  return showAttributeName ? (
    <Th>{data?.attributeName}</Th>
  ) : (
    <Td>
      <Attribute code={code} attribute={attribute} />
    </Td>
  )
}

export default Cell
