import { Box, Text, HStack } from '@chakra-ui/react'

import Attribute from 'app/BE/attribute'
import ContextMenu from 'app/BE/context'
import { FontAwesomeIcon } from '@fortawesome/react-fontawesome'
import { contains } from 'ramda'
import { faEllipsisV } from '@fortawesome/free-solid-svg-icons'
import { selectCode } from 'redux/db/selectors'
import { useSelector } from 'react-redux'

const DetailField = ({ sbeCode, code, attributeCode, isTitle, actions }) => {
  const entityAttribute = useSelector(selectCode(code, attributeCode))

  const title = entityAttribute?.attribute?.name || attributeCode
  const size = isTitle ? '2xl' : 'md'
  const weight = isTitle ? '700' : 'normal'
  const label = isTitle || contains('_IMAGE_')(attributeCode) ? '' : <Text>{title}</Text>

  const acts =
    isTitle && actions?.length > 0 ? (
      <ContextMenu
        actions={actions}
        parentCode={sbeCode}
        code={code}
        button={<FontAwesomeIcon color="grey" icon={faEllipsisV} />}
      />
    ) : (
      <Box hidden />
    )

  return (
    <HStack>
      {acts}
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
    </HStack>
  )
}

export default DetailField
