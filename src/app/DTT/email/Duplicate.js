import { IconButton } from '@chakra-ui/button'
import { HStack, Text, VStack } from '@chakra-ui/layout'
import { faYCombinator } from '@fortawesome/free-brands-svg-icons'
import { faLayerGroup, faTrash } from '@fortawesome/free-solid-svg-icons'
import { FontAwesomeIcon } from '@fortawesome/react-fontawesome'
import Attribute from 'app/BE/attribute'
import Button from 'app/layouts/components/button'
import Card from 'app/layouts/components/card'
import { useSelector } from 'react-redux'
import { selectAttributes } from 'redux/db/selectors'
import { onSendMessage } from 'vertx'

const Duplicate = ({ code, sourceCode }) => {
  const onKill = () =>
    onSendMessage(
      {
        parentCode: 'DUPLICATE_EMAILS',
        code: 'kill',
        targetCode: code,
        sourceCode,
      },
      { redirect: false },
    )

  const onMerge = () =>
    onSendMessage(
      {
        parentCode: 'DUPLICATE_EMAILS',
        code: 'merge',
        targetCode: code,
        sourceCode,
      },
      { redirect: false },
    )

  return (
    <Card variant="card1" w="20rem">
      <HStack>
        <HStack w="12rem">
          <Attribute code={code} attribute="PRI_IMAGE_URL" />
          <Attribute code={code} attribute="PRI_NAME" fallback={<Text>No name set</Text>} />
        </HStack>
        <IconButton onClick={onKill} color="red.300" icon={<FontAwesomeIcon icon={faTrash} />} />
        <IconButton
          onClick={onMerge}
          color="blue.300"
          icon={<FontAwesomeIcon icon={faLayerGroup} />}
        />
      </HStack>
    </Card>
  )
}

export default Duplicate
