import { Tag, VStack } from '@chakra-ui/react'
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
    <VStack align="start" key={col}>
      <Tag
        ml="-1"
        colorScheme={
          label === 'Name' || label === 'Email'
            ? 'purple'
            : label === 'Internship'
            ? 'primary'
            : color
        }
      >
        {label}
      </Tag>
      <Attribute size="sm" code={code} attribute={attribute} config={{ portal: true }} />
    </VStack>
  )
}

export default PickedAttribute
