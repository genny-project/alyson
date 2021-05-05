import { HStack } from '@chakra-ui/react'
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
    <HStack align="start" key={col}>
      <Attribute
        size="xs"
        code={code}
        attribute={attribute}
        config={{ portal: true, textStyle: 'tail.2' }}
      />
    </HStack>
  )
}

export default PickedAttribute
