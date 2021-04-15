import { Box, HStack, Text, VStack } from '@chakra-ui/layout'
import { selectAttributes } from 'redux/db/selectors'
import { selectDashboardCounts } from 'redux/app/selectors'
import { useSelector } from 'react-redux'
import { Button } from '@chakra-ui/button'
import { onSendMessage } from 'vertx'
import { useColorModeValue } from '@chakra-ui/color-mode'
import Attribute from 'app/BE/attribute'
import Counts from './templates/Counts'

const EduProRep = ({ userCode }) => {
  const [name, eduPro, jobTitle] = useSelector(
    selectAttributes(userCode, ['PRI_NAME', 'PRI_ASSOC_EP', 'PRI_JOB_TITLE']),
  )
  const dashboardCounts = useSelector(selectDashboardCounts)

  const cardBg = useColorModeValue('white', '')
  return (
    <VStack>
      <HStack align="stretch">
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
              <Text textStyle="tail3">Welcome back,</Text>
              <Text textStyle="head1">{name?.value}</Text>
              <Text textStyle="body2">{jobTitle?.value}</Text>
              <Text textStyle="body2">{eduPro?.value}</Text>
            </VStack>
          </HStack>
        </Box>

        <Box padding="5" bg={cardBg} borderRadius="md" shadow="md">
          <VStack align="stretch">
            <Text textStyle="body1">Actions</Text>
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
      </HStack>
      <HStack>
        <Counts sbeCodes={dashboardCounts} />
      </HStack>
    </VStack>
  )
}

export default EduProRep
