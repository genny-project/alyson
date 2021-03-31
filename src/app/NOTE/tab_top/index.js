import { Text, VStack } from '@chakra-ui/layout'
import { Tab } from '@chakra-ui/tabs'
import ImageType from 'app/DTT/upload/Image'

const TabTop = ({ tab: { image, title: name }, title }) => {
  return (
    <Tab>
      <VStack align="start" w="12rem">
        <ImageType.Read data={{ value: image }} />
        <Text isTruncated>{name}</Text>
        <Text textStyle="body3">{title}</Text>
      </VStack>
    </Tab>
  )
}

export default TabTop
