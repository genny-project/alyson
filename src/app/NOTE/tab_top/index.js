import { HStack, Text, VStack } from '@chakra-ui/layout'
import { Tab } from '@chakra-ui/tabs'
import ImageType from 'app/DTT/upload/Image'
import { onSendMessage } from 'vertx'

const TabTop = ({ tab: { image, title: name, code }, title, rootCode }) => {
  const handleClick = () =>
    onSendMessage({
      code: 'ACT_PRI_EVENT_ACCESS_NOTES',
      targetCode: code,
      rootCode,
    })

  return (
    <Tab>
      <HStack onClick={handleClick} w="18rem">
        <ImageType.Read data={{ value: image }} />
        <VStack align="start">
          <Text isTruncated>{name}</Text>
          <Text textStyle="body.3">{title}</Text>
        </VStack>
      </HStack>
    </Tab>
  )
}

export default TabTop
