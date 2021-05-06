import { HStack, Text, VStack } from '@chakra-ui/layout'
import { Tab } from '@chakra-ui/tabs'
import ImageType from 'app/DTT/upload/Image'
import { onSendMessage } from 'vertx'

const TabTop = ({ tab: { image, title: name, code, click }, title, rootCode, sourceCode }) => {
  const handleClick = () =>
    onSendMessage({
      code: click,
      targetCode: code,
      rootCode,
      sourceCode,
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
