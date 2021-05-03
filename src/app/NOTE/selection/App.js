import { HStack, Text, VStack } from '@chakra-ui/layout'
import Attribute from 'app/BE/attribute'
import Card from 'app/layouts/components/card'
import { head } from 'ramda'
import { useSelector } from 'react-redux'
import { selectCode } from 'redux/db/selectors'
import safelyParseJson from 'utils/helpers/safely-parse-json'
import { onSendMessage } from 'vertx'

const App = ({ code }) => {
  const hcData = useSelector(selectCode(code, 'LNK_HOST_COMPANY'))
  const hcCode = head(safelyParseJson(hcData?.value, ['']))

  return (
    <Card
      w="25rem"
      cursor="pointer"
      variant="card2"
      _hover={{ bg: '#fafafa' }}
      onClick={() =>
        onSendMessage({ code: 'ACT_PRI_EVENT_ACCESS_NOTES_APPLICATION', targetCode: code })
      }
    >
      <HStack justify="start" w="full">
        <Attribute code={hcCode} attribute={'PRI_IMAGE_URL'} />
        <VStack align="start">
          <Text w="10rem" textStyle="body1">
            <Attribute code={code} attribute={'PRI_ASSOC_HC'} />
          </Text>
          <Attribute code={code} attribute={'PRI_TITLE'} />
        </VStack>
      </HStack>
    </Card>
  )
}

export default App
