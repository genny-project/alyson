import { HStack, Text, VStack } from '@chakra-ui/layout'
import Attribute from 'app/BE/attribute'
import Card from 'app/layouts/components/card'
import { useIsMobile } from 'utils/hooks'
import { onSendMessage } from 'vertx'

const App = ({ code }) => {
  const isMobile = useIsMobile()

  if (isMobile)
    return (
      <Card
        p="3"
        h="full"
        cursor="pointer"
        _hover={{ bg: '#fafafa' }}
        onClick={() =>
          onSendMessage({ code: 'ACT_PRI_EVENT_ACCESS_NOTES_APPLICATION', targetCode: code })
        }
        w="9rem"
      >
        <VStack align="start" justify="space-between" h="full">
          <Text textStyle="tail.1">
            <Attribute code={code} attribute={'PRI_ASSOC_HC'} />
          </Text>
          <Text textStyle="tail.2">
            <Attribute code={code} attribute={'PRI_TITLE'} />
          </Text>
          <Attribute code={code} attribute={'PRI_STATUS'} />
          <Attribute config={{ textStyle: 'tail.3' }} code={code} attribute={'PRI_START_DATE'} />
        </VStack>
      </Card>
    )
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
            <Text textStyle="body.3">Host Company</Text>
            <Attribute code={code} attribute={'PRI_ASSOC_HC'} />
          </Text>
          <Text textStyle="body.3">Internship Title</Text>
          <Text textStyle="body.2" w="10rem">
            <Attribute code={code} attribute={'PRI_TITLE'} />
          </Text>
        </VStack>
        <VStack align="start">
          <Text w="10rem" textStyle="body.1">
            <Text textStyle="body.3">Intern</Text>
            <Attribute code={code} attribute={'PRI_NAME'} />
            <Attribute code={code} attribute={'PRI_STATUS'} />
          </Text>
          <Text w="10rem" textStyle="body.3">
            Start Date
          </Text>
          <Text textStyle="body.2" w="10rem">
            <Attribute config={{ textStyle: 'body.2' }} code={code} attribute={'PRI_START_DATE'} />
          </Text>
        </VStack>
      </HStack>
    </Card>
  )
}

export default App
