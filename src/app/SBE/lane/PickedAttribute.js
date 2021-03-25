import { HStack, Text } from '@chakra-ui/react'
import Attribute from 'app/BE/attribute'
import { useSelector } from 'react-redux'
import { selectCode } from 'redux/db/selectors'
import { getAttribute } from '../utils/get-columns'

const PickedAttribute = ({ col, code, parentCode, color }) => {
  const colData = useSelector(selectCode(parentCode, col))
  const attribute = getAttribute(col)
  const label = colData?.attributeName

  if (label === ' ') return null

  return (
    <HStack align="start" key={col}>
      <Attribute
        size="xs"
        code={code}
        attribute={attribute}
        config={{ portal: true, style: { textTransform: 'uppercase' }, color: 'grey' }}
      />
    </HStack>
  )
}

export default PickedAttribute
