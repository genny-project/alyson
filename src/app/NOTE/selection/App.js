import { HStack, Text, VStack } from '@chakra-ui/layout'
import Attribute from 'app/BE/attribute'
import Card from 'app/layouts/components/card'
import { onSendMessage } from 'vertx'

const App = ({ code }) => {
  return (
    <Card
      h="full"
      w="25rem"
      cursor="pointer"
      variant="card2"
      _hover={{ bg: '#fafafa' }}
      onClick={() =>
        onSendMessage({ code: 'ACT_PRI_EVENT_ACCESS_NOTES_APPLICATION', targetCode: code })
      }
    >
      <HStack align="start">
        <VStack align="start">
          <Text w="10rem" textStyle="body.1">
            <Text textStyle="body3">Host Company</Text>
            <Attribute code={code} attribute={'PRI_ASSOC_HC'} />
          </Text>
          <Text textStyle="body3">Internship Title</Text>
          <Text textStyle="body2" w="10rem">
            <Attribute code={code} attribute={'PRI_TITLE'} />
          </Text>
        </VStack>
        <VStack align="start">
          <Text w="10rem" textStyle="body.1">
            <Text textStyle="body3">Intern</Text>
            <Attribute code={code} attribute={'PRI_NAME'} />
            <Attribute code={code} attribute={'PRI_STATUS'} />
          </Text>
          <Text w="10rem" textStyle="body3">
            Start Date
          </Text>
          <Text textStyle="body2" w="10rem">
            <Attribute config={{ textStyle: 'body2' }} code={code} attribute={'PRI_START_DATE'} />
          </Text>
        </VStack>
      </HStack>
    </Card>
  )
}

export default App
