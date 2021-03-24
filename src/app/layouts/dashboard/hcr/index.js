import { Box, Center, HStack, Text, VStack } from '@chakra-ui/layout'
import { selectAttributes } from 'redux/db/selectors'
import { selectDashboard } from 'redux/app/selectors'
import { useSelector } from 'react-redux'
import DisplaySbe from 'app/SBE'
import { includes, find } from 'ramda'
import { Button, ButtonGroup, IconButton } from '@chakra-ui/button'
import { FontAwesomeIcon } from '@fortawesome/react-fontawesome'
import { faBriefcase, faPlus } from '@fortawesome/free-solid-svg-icons'
import { onSendMessage } from 'vertx'
import Process from 'app/layouts/process'

const HostCompanyRep = ({ userCode }) => {
  const [name, hc, jobTitle] = useSelector(
    selectAttributes(userCode, ['PRI_NAME', 'PRI_ASSOC_HC', 'PRI_JOB_TITLE']),
  )
  const dashboardSbes = useSelector(selectDashboard)

  const serviceAgreement = find(includes('_SERVICE_AGREEMENT_DOC_'))(dashboardSbes)
  const ohsDeclaration = find(includes('_SERVICE_AGREEMENT_DOC_'))(dashboardSbes)

  return (
    <Center>
      <Box position="absolute" style={{ right: 10, top: 80 }}>
        <VStack spacing="5">
          <DisplaySbe sbeCode={serviceAgreement} />
          <DisplaySbe sbeCode={ohsDeclaration} />
        </VStack>
      </Box>
      <VStack spacing="5">
        <Text fontSize="2xl" fontWeight="semibold">{`Welcome ${name?.value}`}</Text>
        <Text>{`${jobTitle?.value} ${hc?.value}`}</Text>

        <Button
          onClick={() =>
            onSendMessage({ code: 'QUE_INTERNSHIP_MENU', parentCode: 'QUE_ADD_ITEMS_GRP' })
          }
          colorScheme="secondary"
          leftIcon={<FontAwesomeIcon icon={faBriefcase} />}
        >
          Create an Internship
        </Button>

        <HStack>
          <Button
            onClick={() =>
              onSendMessage({
                code: 'QUE_TREE_ITEM_INTERNSHIPS',
                parentCode: 'QUE_TREE_ITEM_INTERNSHIPS',
              })
            }
            variant="outline"
            size="sm"
          >
            Manage Current Internships
          </Button>
          <ButtonGroup size="sm" variant="outline" isAttached>
            <Button
              onClick={() =>
                onSendMessage({ code: 'QUE_TREE_ITEM_HCRS', parentCode: 'QUE_TREE_ITEM_HCRS' })
              }
              mr="-px"
            >
              Manage Reps
            </Button>
            <IconButton
              onClick={() =>
                onSendMessage({ code: 'QUE_HOST_CPY_REP_MENU', parentCode: 'QUE_ADD_ITEMS_GRP' })
              }
              icon={<FontAwesomeIcon icon={faPlus} />}
            />
          </ButtonGroup>
        </HStack>

        <Process dashboard />
      </VStack>
    </Center>
  )
}

export default HostCompanyRep
