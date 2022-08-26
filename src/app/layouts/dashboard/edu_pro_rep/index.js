import { Box, HStack, Stack, Text, VStack } from '@chakra-ui/layout'
import { callBucketView, onSendMessage } from 'vertx'
import { selectAttributes, selectCode } from 'redux/db/selectors'

import Attribute from 'app/BE/attribute'
import { Button } from '@chakra-ui/button'
import Process from 'app/layouts/process'
import { equals } from 'ramda'
import { useColorModeValue } from '@chakra-ui/color-mode'
import { useEffect } from 'react'
import { useSelector } from 'react-redux'

const EduProRep = ({ userCode }) => {
  const [name, eduPro, jobTitle] = useSelector(
    selectAttributes(userCode, ['PRI_NAME', 'PRI_ASSOC_EP', 'PRI_JOB_TITLE']),
  )
  const cardBg = useColorModeValue('white', '')

  const educationProviderCode = useSelector(
    selectCode(userCode, 'LNK_EDU_PROVIDER'),
  )?.value.replace(/[\[\]"]+/g, '')
  const educationProviderName = useSelector(selectCode(educationProviderCode, 'PRI_NAME'))?.value
  const isVicDigJobRep = equals(educationProviderName)('Victorian Government Digital Jobs Program')

  useEffect(() => {
    callBucketView()
  }, [])

  return (
    <VStack>
      <Stack direction={['column', 'row']} align="stretch">
        <Box padding="5" bg={cardBg} borderRadius="md" shadow="md">
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
              <Text textStyle="tail.3">Welcome back,</Text>
              <Text textStyle="head.1">{name?.value}</Text>
              <Text textStyle="body.2">{jobTitle?.value}</Text>
              <Text textStyle="body.2">{eduPro?.value}</Text>
            </VStack>
          </HStack>
        </Box>
        {!isVicDigJobRep && (
          <Box padding="5" bg={cardBg} borderRadius="md" shadow="md">
            <VStack align="stretch">
              <Text textStyle="body.1">Actions</Text>
              <Button
                colorScheme="primary"
                onClick={() =>
                  onSendMessage({
                    code: 'QUE_TREE_ITEM_INTERNS',
                    parentCode: 'QUE_TREE_ITEM_INTERNS',
                  })
                }
                variant="outline"
              >
                Manage Current Interns
              </Button>
              <Button
                colorScheme="primary"
                variant="outline"
                onClick={() =>
                  onSendMessage({
                    code: 'QUE_TREE_ITEM_EPRS',
                    parentCode: 'QUE_TREE_ITEM_EPRS',
                  })
                }
                mr="-px"
              >
                Manage Reps
              </Button>

              <Button
                colorScheme="primary"
                variant="outline"
                onClick={() =>
                  onSendMessage({
                    code: 'QUE_EDU_PRO_REP_MENU',
                    parentCode: 'QUE_ADD_ITEMS_GRP',
                  })
                }
              >
                Add Rep
              </Button>
            </VStack>
          </Box>
        )}
      </Stack>
      <Process dashboard />
    </VStack>
  )
}

export default EduProRep
