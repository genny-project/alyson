import { Center, HStack, Text, VStack } from '@chakra-ui/layout'
import Attribute from 'app/BE/attribute'
import Button from 'app/layouts/components/button'
import Card from 'app/layouts/components/card'
import { useSelector } from 'react-redux'
import { selectAttributes, selectCode } from 'redux/db/selectors'
import { onSendMessage } from 'vertx'

const LinkedApp = ({ code }) => {
  const userCode = useSelector(selectCode('USER'))
  const [mentorName] = useSelector(selectAttributes(code, ['PRI_MENTOR_NAME']))

  if (!mentorName) return null
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
        <VStack>
          <Text textStyle="head.2" maxW="40rem" textAlign="center">
            {`${mentorName?.value}, your mentor, has asked to pick from these three times for your first meeting!`}
          </Text>

          <VStack>
            <Text textStyle="body.1">Primary Availability</Text>
            <Button onClick={() => onSelect('PRI_PRIMARY_AVAILABILITY')} variant="special">
              <Attribute code={code} attribute={'PRI_PRIMARY_AVAILABILITY'} />
            </Button>
          </VStack>

          <HStack>
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
        </VStack>
      </Card>
    </Center>
  )
}

export default LinkedApp
