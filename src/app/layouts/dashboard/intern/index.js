import { Box, HStack, Text, VStack, Stack } from '@chakra-ui/layout'
import { Button } from '@chakra-ui/button'
import { useColorModeValue } from '@chakra-ui/color-mode'
import { useSelector } from 'react-redux'
import { FontAwesomeIcon } from '@fortawesome/react-fontawesome'
import { faArrowRight, faSearch } from '@fortawesome/free-solid-svg-icons'
import { find, includes } from 'ramda'

import { selectAttributes } from 'redux/db/selectors'
import { selectDashboard } from 'redux/app/selectors'
import { onSendMessage } from 'vertx'
import Recommendations from './recommendations'
import Process from 'app/layouts/process'
import Attribute from 'app/BE/attribute'
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
    <VStack>
      <Stack maxW="90vw" direction={['column', 'row']} align="stretch">
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
              <Text textStyle="tail.3">{`Welcome back,`}</Text>
              <Text textStyle="head.1">{name?.value}</Text>
              <VStack align="start">
                <Text textStyle="body.1">{`Documents`}</Text>
                <DisplaySbe sbeCode={serviceAgreement} />
                <DisplaySbe sbeCode={ohsDeclaration} />
                <DisplaySbe sbeCode={termsAndConditions} />
              </VStack>
            </VStack>
          </HStack>
        </Box>
        <Box padding="5" bg={cardBg} borderRadius="md" shadow="md">
          <VStack align="stretch" height="100%">
            <Text textStyle="body.1">{`Actions`}</Text>
            <VStack align="stretch" height="inherit" justifyContent="space-evenly">
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
                {` Edit Your Profile`}
              </Button>
            </VStack>
          </VStack>
        </Box>
      </Stack>
      <Process dashboard />
      <Recommendations />
    </VStack>
  )
}

export default Intern
