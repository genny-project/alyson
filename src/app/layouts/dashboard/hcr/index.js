import { Box, HStack, Stack, Text, VStack } from '@chakra-ui/layout'
import { Button } from '@chakra-ui/button'
import { FontAwesomeIcon } from '@fortawesome/react-fontawesome'
import { faBriefcase, faDownload, faEdit } from '@fortawesome/free-solid-svg-icons'
import { useSelector } from 'react-redux'
import { useColorModeValue } from '@chakra-ui/color-mode'

import { selectAttributes, selectCode } from 'redux/db/selectors'
import { callBucketView, onSendMessage } from 'vertx'
import Attribute from 'app/BE/attribute'
import { useEffect } from 'react'
import Card from 'app/layouts/components/card'

const HostCompanyRep = ({ userCode }) => {
  const [name, hc, jobTitle] = useSelector(
    selectAttributes(userCode, ['PRI_NAME', 'PRI_ASSOC_HC', 'PRI_JOB_TITLE']),
  )
  const companyCode = useSelector(selectCode('COMPANY'))
  const validation = useSelector(selectCode(companyCode, 'PRI_VALIDATION'))

  const ohs =
    validation?.value === 'OHS' || validation?.value === 'Ready' ? (
      <Button
        colorScheme="green"
        onClick={() => onSendMessage({ targetCode: companyCode, code: 'ACT_OHS_DOC' })}
        leftIcon={<FontAwesomeIcon icon={faDownload} />}
      >
        {`OH&S Declaration`}
      </Button>
    ) : (
      <Button
        colorScheme="red"
        onClick={() =>
          onSendMessage({ targetCode: companyCode, code: 'ACT_PRI_EVENT_OHS_UNVALIDATED' })
        }
        leftIcon={<FontAwesomeIcon icon={faEdit} />}
      >
        {`OH&S Declaration`}
      </Button>
    )

  const hcs =
    validation?.value === 'HCS' || validation?.value === 'Ready' ? (
      <Button
        colorScheme="green"
        leftIcon={<FontAwesomeIcon icon={faDownload} />}
        onClick={() => onSendMessage({ targetCode: companyCode, code: 'ACT_HCS_DOC' })}
      >
        Host Company Service Agreement
      </Button>
    ) : (
      <Button
        colorScheme="red"
        leftIcon={<FontAwesomeIcon icon={faEdit} />}
        onClick={() => onSendMessage({ targetCode: companyCode, code: 'ACT_HCS_DOC' })}
      >
        Host Company Service Agreement
      </Button>
    )

  const documents = (
    <Card variant="card0" w={'25rem'}>
      <VStack align="start">
        <Text textStyle="body.1">
          {!validation?.value || validation?.value === 'Incomplete'
            ? 'Please complete documents'
            : 'Documents'}
        </Text>
        {ohs}
        {hcs}
      </VStack>
    </Card>
  )

  const cardBg = useColorModeValue('white', '')

  useEffect(() => {
    callBucketView()
  }, [])

  return (
    <VStack>
      <Stack maxW="90vw" direction={['column', 'row']} align="stretch">
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
                <Text textStyle="tail.3">Welcome back,</Text>
                <Text textStyle="head.1">{name?.value}</Text>
                <Text textStyle="body.2">{jobTitle?.value}</Text>
                <Text textStyle="body.2">{hc?.value}</Text>
              </VStack>
            </HStack>
          </Box>
          <VStack align="stretch" padding="5" bg={cardBg} borderRadius="md" shadow="md">
            {documents}
          </VStack>
        </VStack>

        <Box padding="5" bg={cardBg} borderRadius="md" shadow="md">
          <VStack align="stretch">
            <Text textStyle="body.1">Actions</Text>
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
      </Stack>
      {/* <Process dashboard /> */}
    </VStack>
  )
}

export default HostCompanyRep
