import { HStack, Text, Box } from '@chakra-ui/react'
import Attribute from 'app/BE/attribute'
import ContextMenu from 'app/BE/context'
import { useSelector } from 'react-redux'
import { selectCode } from 'redux/db/selectors'
import { FontAwesomeIcon } from '@fortawesome/react-fontawesome'
import { faEllipsisV } from '@fortawesome/free-solid-svg-icons'
import { equals } from 'ramda'

const DetailField = ({ sbeCode, code, attributeCode, index, actions }) => {
  const entityAttribute = useSelector(selectCode(code, attributeCode))

  const title = entityAttribute?.attribute?.name || attributeCode
  const size = equals(index)(0) ? '4xl' : 'md'
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
    <HStack>
      {acts}
      {label}
      <Attribute code={code} attribute={attributeCode} config={{ fontSize: size }} />
    </HStack>
  )
}

export default DetailField
