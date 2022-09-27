import Attribute from 'app/BE/attribute'
import { Stack } from '@chakra-ui/react'
import { getAttribute } from '../utils/get-columns'
import { selectCode } from 'redux/db/selectors'
import { useSelector } from 'react-redux'

const PickedAttribute = ({ col, code, parentCode }) => {
  const colData = useSelector(selectCode(parentCode, col))
  const attribute = getAttribute(col)
  const label = colData?.attributeName

  if (label === ' ') return null

  return (
    <Stack align="start" key={col}>
      <Attribute
        size="xs"
        code={code}
        attribute={attribute}
        config={{ portal: 'true', textStyle: 'tail.2' }}
      />
    </Stack>
  )
}

export default PickedAttribute
