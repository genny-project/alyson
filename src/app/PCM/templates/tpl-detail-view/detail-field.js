import { Box, Text } from '@chakra-ui/react'

import Attribute from 'app/BE/attribute'
import ContextMenu from 'app/BE/context'
import { FontAwesomeIcon } from '@fortawesome/react-fontawesome'
import { equals } from 'ramda'
import { faEllipsisV } from '@fortawesome/free-solid-svg-icons'
import { selectCode } from 'redux/db/selectors'
import { useSelector } from 'react-redux'

const DetailField = ({ sbeCode, code, attributeCode, index, actions }) => {
  const entityAttribute = useSelector(selectCode(code, attributeCode))

  const title = entityAttribute?.attribute?.name || attributeCode
  const size = equals(index)(0) ? '2xl' : 'md'
  const weight = equals(index)(0) ? '700' : 'normal'
  const label = equals(index)(0) ? '' : <Text>{title}:</Text>

  const acts =
    equals(index)(0) && actions?.length > 0 ? (
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
    <Box>
      {acts}
      <Text as="label" hidden>
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
