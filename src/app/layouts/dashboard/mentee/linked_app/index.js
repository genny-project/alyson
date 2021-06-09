import { useSelector } from 'react-redux'
import { Center, HStack, Text, VStack } from '@chakra-ui/layout'

import { selectCode } from 'redux/db/selectors'
import { onSendMessage } from 'vertx'
import Attribute from 'app/BE/attribute'
import Button from 'app/layouts/components/button'
import Card from 'app/layouts/components/card'

const LinkedApp = ({ code, setShowLinkedApplication }) => {
  const userCode = useSelector(selectCode('USER'))
  const menteeName = useSelector(selectCode(userCode, 'PRI_NAME'))?.value

  if (!menteeName) return null
  const onSelect = option => {
    onSendMessage({
      targetCode: code,
      sourceCode: userCode,
      code: `ACT_${option}`,
    })
  }
  return (
    <Center>
      <Card>
        <VStack spacing={10}>
          <Text textStyle="head.2" maxW="40rem" textAlign="center">
            {`${menteeName}, your mentor, has asked to pick from these three times for your first meeting!`}
          </Text>
          <VStack>
            <Text textStyle="body.1">Primary Availability</Text>
            <Button onClick={() => onSelect('PRI_PRIMARY_AVAILABILITY')} variant="special">
              <Attribute code={code} attribute={'PRI_PRIMARY_AVAILABILITY'} />
            </Button>
          </VStack>

          <HStack spacing={5}>
            <VStack>
              <Text textStyle="body.3">Secondary Availability</Text>
              <Button onClick={() => onSelect('PRI_SECONDARY_AVAILABILITY')} variant="secondary">
                <Attribute code={code} attribute={'PRI_SECONDARY_AVAILABILITY'} />
              </Button>
            </VStack>
            <VStack>
              <Text textStyle="body.3">Tertiary Availability</Text>
              <Button onClick={() => onSelect('PRI_TERTIARY_AVAILABILITY')} variant="secondary">
                <Attribute code={code} attribute={'PRI_TERTIARY_AVAILABILITY'} />
              </Button>
            </VStack>
          </HStack>
          <Button onClick={() => setShowLinkedApplication(false)} w="100%">{`CLOSE`}</Button>
        </VStack>
      </Card>
    </Center>
  )
}

export default LinkedApp
