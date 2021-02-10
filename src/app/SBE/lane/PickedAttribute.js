import { Badge, VStack, Text } from '@chakra-ui/react'
import Attribute from 'app/BE/attribute'
import { useSelector } from 'react-redux'
import { selectCode } from 'redux/db/selectors'
import { getAttribute } from '../utils/get-columns'
const PickedAttribute = ({ col, code, parentCode }) => {
  const colData = useSelector(selectCode(parentCode, col))
  const attribute = getAttribute(col)
  const label = colData?.attributeName

  if (label === ' ') return null

  return (
    <VStack align="left" key={col}>
      <Badge>{label}</Badge>
      <Attribute code={code} attribute={attribute} />
    </VStack>
  )
}

export default PickedAttribute
