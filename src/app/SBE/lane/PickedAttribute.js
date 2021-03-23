import { HStack, Tag } from '@chakra-ui/react'
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
      <Tag
        w="7rem"
        variant="subtle"
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
    </HStack>
  )
}

export default PickedAttribute
