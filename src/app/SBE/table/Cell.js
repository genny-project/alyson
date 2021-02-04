import { Th, Td } from '@chakra-ui/react'
import { useSelector } from 'react-redux'
import { selectCode } from 'redux/db/selectors'

const Cell = ({ code, attribute, showAttributeName }) => {
  const data = useSelector(selectCode(code, attribute))

  return showAttributeName ? <Th>{data?.attributeName}</Th> : <Td>{data?.value || ''}</Td>
}

export default Cell
