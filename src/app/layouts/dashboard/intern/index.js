import { Box, HStack, Text, VStack } from '@chakra-ui/layout'
import { selectAttributes } from 'redux/db/selectors'
import { useSelector } from 'react-redux'
import { Button } from '@chakra-ui/button'
import { FontAwesomeIcon } from '@fortawesome/react-fontawesome'
import { faArrowRight, faSearch } from '@fortawesome/free-solid-svg-icons'
import { onSendMessage } from 'vertx'
import Recommendations from './recommendations'
import Process from 'app/layouts/process'
import { useColorModeValue } from '@chakra-ui/color-mode'
import Attribute from 'app/BE/attribute'
import { selectDashboard } from 'redux/app/selectors'
import { find, includes } from 'ramda'
import DisplaySbe from 'app/SBE'

const Intern = ({ userCode }) => {
  const [name] = useSelector(selectAttributes(userCode, ['PRI_NAME']))
  const dashboardSbes = useSelector(selectDashboard)
  const cardBg = useColorModeValue('white', '')

  const internSbe = find(includes('_INTERN_'), dashboardSbes || [])

  const serviceAgreement = find(includes('_SERVICE_AGREEMENT_DOC_'))(dashboardSbes)
  const ohsDeclaration = find(includes('_OHNS_'))(dashboardSbes)
  const termsAndConditions = find(includes('_TERMS_AND_CONDITIONS_'))(dashboardSbes)

  return (
    <VStack spacing="6">
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
              <VStack align="stretch" padding="5" bg={cardBg} borderRadius="md" shadow="md">
                <Text textStyle="body1">Documents</Text>
                <DisplaySbe sbeCode={serviceAgreement} />
                <DisplaySbe sbeCode={ohsDeclaration} />
                <DisplaySbe sbeCode={termsAndConditions} />
              </VStack>
            </VStack>
          </HStack>
        </Box>
        <Box padding="5" bg={cardBg} borderRadius="md" shadow="md">
          <VStack align="stretch">
            <Text textStyle="body1">Actions</Text>
            <Button
              onClick={() =>
                onSendMessage({
                  code: 'QUE_TREE_ITEM_INTERNSHIPS',
                  parentCode: 'QUE_TREE_ITEM_INTERNSHIPS',
                })
              }
              colorScheme="primary"
              leftIcon={<FontAwesomeIcon icon={faSearch} />}
              rightIcon={<FontAwesomeIcon icon={faArrowRight} />}
            >
              {`Find an Internship`}
            </Button>
            <Button
              onClick={() =>
                onSendMessage({
                  code: 'ACT_PRI_EVENT_EDIT',
                  parentCode: internSbe,
                  targetCode: userCode,
                })
              }
              colorScheme="primary"
              variant="outline"
            >
              Edit Your Profile
            </Button>
            <Button
              colorScheme="primary"
              variant="outline"
              onClick={() =>
                onSendMessage({
                  code: 'ACT_PRI_EVENT_TERMS_AND_CONDITIONS',
                  parentCode: internSbe,
                  targetCode: userCode,
                })
              }
            >
              Terms and Conditions
            </Button>
          </VStack>
        </Box>
      </HStack>

      <Process dashboard />
      <Recommendations />
    </VStack>
  )
}

export default Intern
