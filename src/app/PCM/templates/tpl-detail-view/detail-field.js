import { HStack, Text } from '@chakra-ui/react'
import Attribute from 'app/BE/attribute'
import { useSelector } from 'react-redux'
import { selectCode } from 'redux/db/selectors'

const DetailField = ({ code, attributeCode, index }) => {
  const entityAttribute = useSelector(selectCode(code, attributeCode))

  const title = entityAttribute?.attribute?.name || attributeCode
  const size = index === 0 ? '4xl' : 'md'
  const label = index === 0 ? <></> : <Text>{title}:</Text>

  return (
    <Text fontSize={size}>
      <HStack>
        {label}
        <Attribute code={code} attribute={attributeCode} />
      </HStack>
    </Text>
  )
}

export default DetailField
