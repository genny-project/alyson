import { useSelector } from 'react-redux'
import { Button, HStack, VStack, Text } from '@chakra-ui/react'

import { onSendMessage } from 'vertx'
import Card from 'app/layouts/components/card'
import { selectCode } from 'redux/db/selectors'

import Attribute from 'app/BE/attribute'

const MentorDashboard = () => {
  const userCode = useSelector(selectCode('USER'))
  const name = useSelector(selectCode(userCode, 'PRI_NAME'))?.value

  return (
    <VStack spacing={4}>
      <Card>
        <VStack spacing={10}>
          <Attribute config={{ size: 'xl' }} code={userCode} attribute="PRI_IMAGE_URL" />
          {name && <Text textStyle="head.2">{`Welcome to Mentormatch, ${name}!`}</Text>}
          <HStack spacing={5}>
            <Button
              colorScheme="red"
              onClick={() =>
                onSendMessage({
                  code: 'ACT_GO_TO_PROFILE',
                  parentCode: 'BTN_CLICK',
                })
              }
            >
              {`View Profile`}
            </Button>
            <Button
              colorScheme="blue"
              onClick={() =>
                onSendMessage({
                  code: 'ACT_PRI_EVENT_START_MENTOR_TRAINING',
                })
              }
            >
              {`Watch Training Videos`}
            </Button>
          </HStack>
        </VStack>
      </Card>
    </VStack>
  )
}

export default MentorDashboard
