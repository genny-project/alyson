import { Box, HStack, Stack, Text, VStack } from '@chakra-ui/layout'
import { faArrowRight, faBookmark, faBookOpen } from '@fortawesome/free-solid-svg-icons'
import { FontAwesomeIcon } from '@fortawesome/react-fontawesome'
import Attribute from 'app/BE/attribute'
import Button from 'app/layouts/components/button'
import Card from 'app/layouts/components/card'
import { useSelector } from 'react-redux'
import { selectCode } from 'redux/db/selectors'
import { onSendMessage } from 'vertx'
import LinkedApp from './linked_app'

const MenteeDashboard = () => {
  const userCode = useSelector(selectCode('USER'))
  const linkedApp = useSelector(selectCode(userCode, 'PRI_APP_LNK_CODE'))

  if (linkedApp?.value) return <LinkedApp code={linkedApp.value} />
  return (
    <VStack>
      <Stack maxW="90vw" direction={['column', 'row']} align="stretch">
        <Card>
          <HStack spacing="5">
            <Box
              onClick={() =>
                onSendMessage({
                  code: 'QUE_AVATAR_PROFILE_GRP',
                  parentCode: 'QUE_AVATAR_GRP',
                  rootCode: userCode,
                  targetCode: userCode,
                })
              }
            >
              <Attribute code={userCode} attribute="PRI_IMAGE_URL" config={{ size: '2xl' }} />
            </Box>
            <VStack align="start">
              <Text textStyle="tail.3">{`Welcome back,`}</Text>
              <Text textStyle="head.1">
                <Attribute code={userCode} attribute="PRI_NAME" />
              </Text>
              <Text textStyle="body.3">
                <Attribute code={userCode} attribute="PRI_EMAIL" />
              </Text>
            </VStack>
          </HStack>
        </Card>
        <Card>
          <VStack align="stretch" height="100%">
            <Text textStyle="body.1">{`Actions`}</Text>
            <VStack align="stretch" height="inherit" justifyContent="space-evenly">
              <Button
                onClick={() =>
                  onSendMessage({
                    code: 'ACT_PRI_EVENT_START_MENTEE_TRAINING',
                  })
                }
                colorScheme="primary"
                leftIcon={<FontAwesomeIcon icon={faBookOpen} />}
                rightIcon={<FontAwesomeIcon icon={faArrowRight} />}
              >
                {`Start your Training`}
              </Button>
              <Button
                onClick={() =>
                  onSendMessage({
                    code: 'ACT_PRI_EVENT_EDIT',
                    targetCode: userCode,
                  })
                }
                colorScheme="primary"
                variant="outline"
              >
                {`Edit Your Profile`}
              </Button>
            </VStack>
          </VStack>
        </Card>
      </Stack>
    </VStack>
  )
}

export default MenteeDashboard
