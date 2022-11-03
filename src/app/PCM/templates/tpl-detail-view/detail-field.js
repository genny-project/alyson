import { Box, Text } from '@chakra-ui/react'

import Attribute from 'app/BE/attribute'
import { selectCode } from 'redux/db/selectors'
import { useSelector } from 'react-redux'
import includesAny from 'utils/helpers/includes-any'

const DetailField = ({ code, attributeCode, isTitle }) => {
  const entityAttribute = useSelector(selectCode(code, attributeCode))

  if (!attributeCode) {
    return null
  }

  const title = entityAttribute?.attribute?.name || attributeCode
  const size = isTitle ? '2xl' : 'md'
  const weight = isTitle ? '700' : 'normal'
  const label =
    isTitle || includesAny('_IMAGE', '_PICTURE')(attributeCode) ? '' : <Text>{title}</Text>

  return (
    <Box>
      <Text as="label" textStyle="tail.1" color="gray.700">
        {label}
      </Text>
      <Attribute
        code={code}
        attribute={attributeCode}
        config={{ fontSize: size, fontWeight: weight }}
      />
    </Box>
  )
}

export default DetailField
