import { IconButton } from '@chakra-ui/button'
import { HStack, Text } from '@chakra-ui/layout'
import { faLayerGroup, faTrash } from '@fortawesome/free-solid-svg-icons'
import { FontAwesomeIcon } from '@fortawesome/react-fontawesome'
import Attribute from 'app/BE/attribute'
import Card from 'app/layouts/components/card'
import { onSendMessage } from 'vertx'

const Duplicate = ({ code, sourceCode, email }) => {
  const onKill = () =>
    onSendMessage(
      {
        parentCode: 'DUPLICATE_EMAILS',
        code: 'kill',
        targetCode: code,
        sourceCode,
        rootCode: email,
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
        rootCode: email,
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
        {/* <IconButton
          onClick={onMerge}
          color="blue.300"
          icon={<FontAwesomeIcon icon={faLayerGroup} />}
        /> */}
      </HStack>
    </Card>
  )
}

export default Duplicate
