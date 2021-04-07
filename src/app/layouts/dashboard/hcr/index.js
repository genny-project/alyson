import { Box, HStack, Text, VStack } from '@chakra-ui/layout'
import { selectAttributes } from 'redux/db/selectors'
import { selectDashboard } from 'redux/app/selectors'
import { useSelector } from 'react-redux'
import DisplaySbe from 'app/SBE'
import { includes, find } from 'ramda'
import { Button } from '@chakra-ui/button'
import { FontAwesomeIcon } from '@fortawesome/react-fontawesome'
import { faBriefcase } from '@fortawesome/free-solid-svg-icons'
import { onSendMessage } from 'vertx'
import Process from 'app/layouts/process'
import { useColorModeValue } from '@chakra-ui/color-mode'
import Attribute from 'app/BE/attribute'

const HostCompanyRep = ({ userCode }) => {
  const [name, hc, jobTitle] = useSelector(
    selectAttributes(userCode, ['PRI_NAME', 'PRI_ASSOC_HC', 'PRI_JOB_TITLE']),
  )
  const dashboardSbes = useSelector(selectDashboard)

  const serviceAgreement = find(includes('_SERVICE_AGREEMENT_DOC_'))(dashboardSbes)
  const ohsDeclaration = find(includes('_OHNS_'))(dashboardSbes)

  const cardBg = useColorModeValue('white', '')
  return (
    <VStack>
      <HStack align="stretch">
        <VStack align="stretch">
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
                <Text textStyle="body2">{hc?.value}</Text>
              </VStack>
            </HStack>
          </Box>
          <VStack align="stretch" padding="5" bg={cardBg} borderRadius="md" shadow="md">
            <Text textStyle="body1">Documents</Text>
            <DisplaySbe sbeCode={serviceAgreement} />
            <DisplaySbe sbeCode={ohsDeclaration} />
          </VStack>
        </VStack>

        <Box padding="5" bg={cardBg} borderRadius="md" shadow="md">
          <VStack align="stretch">
            <Text textStyle="body1">Actions</Text>
            <Button
              onClick={() =>
                onSendMessage({ code: 'QUE_INTERNSHIP_MENU', parentCode: 'QUE_ADD_ITEMS_GRP' })
              }
              colorScheme="primary"
              leftIcon={<FontAwesomeIcon icon={faBriefcase} />}
            >
              Create an Internship
            </Button>
            <Button
              colorScheme="primary"
              onClick={() =>
                onSendMessage({
                  code: 'QUE_TREE_ITEM_INTERNSHIPS',
                  parentCode: 'QUE_TREE_ITEM_INTERNSHIPS',
                })
              }
              variant="outline"
            >
              Manage Current Internships
            </Button>
            <Button
              colorScheme="primary"
              variant="outline"
              onClick={() =>
                onSendMessage({
                  code: 'QUE_TREE_ITEM_HCRS',
                  parentCode: 'QUE_TREE_ITEM_HCRS',
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
                  code: 'QUE_HOST_CPY_REP_MENU',
                  parentCode: 'QUE_ADD_ITEMS_GRP',
                })
              }
            >
              Add Rep
            </Button>
          </VStack>
        </Box>
      </HStack>
      <Process dashboard />
    </VStack>
  )
}

export default HostCompanyRep
