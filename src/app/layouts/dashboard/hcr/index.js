import { Box, HStack, Stack, Text, VStack } from '@chakra-ui/layout'
import { callBucketView, onSendMessage } from 'vertx'
import { faBriefcase, faCheckCircle, faDownload, faEdit } from '@fortawesome/free-solid-svg-icons'
import { selectAttributes, selectCode } from 'redux/db/selectors'

import Attribute from 'app/BE/attribute'
import { Button } from '@chakra-ui/button'
import Card from 'app/layouts/components/card'
import { FontAwesomeIcon } from '@fortawesome/react-fontawesome'
import Process from 'app/layouts/process'
import { equals } from 'ramda'
import { useColorModeValue } from '@chakra-ui/color-mode'
import { useEffect } from 'react'
import { useSelector } from 'react-redux'

const HostCompanyRep = ({ userCode }) => {
  const [name, hc, jobTitle] = useSelector(
    selectAttributes(userCode, ['PRI_NAME', 'PRI_ASSOC_HC', 'PRI_JOB_TITLE']),
  )
  const companyCode = useSelector(selectCode('COMPANY'))
  const validation = useSelector(selectCode(companyCode, 'PRI_VALIDATION'))

  const hasOHSDoc = useSelector(selectCode(companyCode, 'PRI_DOC_OHS'))?.value
  const OHSDocStatus = useSelector(selectCode(companyCode, 'PRI_DOC_OHS_STATUS'))?.value
  const isOHSDocAgreed = equals(OHSDocStatus)('Complete')

  const hasDJPDoc = useSelector(selectCode(companyCode, 'PRI_DOC_DJP'))?.value
  const DJPDocStatus = useSelector(selectCode(companyCode, 'PRI_DOC_DJP_STATUS'))?.value
  const isDJPDocAgreed = equals(DJPDocStatus)('Complete')

  const hasHCSDoc = useSelector(selectCode(companyCode, 'PRI_DOC_HCS'))?.value
  const HCSDocStatus = useSelector(selectCode(companyCode, 'PRI_DOC_HCS_STATUS'))?.value
  const isHCSDocAgreed = equals(HCSDocStatus)('Complete')

  const hasHCRIDoc = useSelector(selectCode(companyCode, 'PRI_DOC_HCRI'))?.value
  const HCRIDocStatus = useSelector(selectCode(companyCode, 'PRI_DOC_HCRI_STATUS'))?.value
  const isHCRIDocAgreed = equals(HCRIDocStatus)('Complete')

  const DocButtons = ({ actionCode = '', buttonName = '', icon = faEdit, colorScheme = 'red' }) => {
    return (
      <Button
        size="sm"
        leftIcon={<FontAwesomeIcon icon={icon} />}
        onClick={() => onSendMessage({ targetCode: companyCode, code: actionCode })}
        colorScheme={colorScheme}
        height={'auto'}
        paddingBlock={3}
        whiteSpace={'normal'}
        textAlign={'left'}
        alignItems={'flex-start'}
        justifyContent={'flex-start'}
      >
        <Text as="span">{buttonName}</Text>
      </Button>
    )
  }

  const documents = (
    <Card variant="card0" w={'25rem'}>
      <VStack align="start">
        <HStack>
          <Text textStyle="body.1">
            {!validation?.value || validation?.value === 'Incomplete'
              ? 'Please complete documents'
              : 'Documents'}
          </Text>
          {validation?.value === 'Validated' && (
            <FontAwesomeIcon opacity="0.5" color="green" icon={faCheckCircle} />
          )}
        </HStack>
        {hasOHSDoc && (
          <DocButtons
            actionCode="ACT_OHS_DOC"
            buttonName="OH&S Declaration"
            icon={isOHSDocAgreed ? faDownload : faEdit}
            colorScheme={isOHSDocAgreed ? 'green' : 'red'}
          />
        )}
        {hasHCSDoc && (
          <DocButtons
            actionCode="ACT_HCS_DOC"
            buttonName="Student & Graduate Host Company Agreement"
            icon={isHCSDocAgreed ? faDownload : faEdit}
            colorScheme={isHCSDocAgreed ? 'green' : 'red'}
          />
        )}
        {hasDJPDoc && (
          <DocButtons
            actionCode="ACT_DJP_DOC"
            buttonName="Digital Jobs Program Host Employer Subsidy Agreement"
            icon={isDJPDocAgreed ? faDownload : faEdit}
            colorScheme={isDJPDocAgreed ? 'green' : 'red'}
          />
        )}
        {hasHCRIDoc && (
          <DocButtons
            actionCode="ACT_HCRI_DOC"
            buttonName="Host Company Remote Internship"
            icon={isHCRIDocAgreed ? faDownload : faEdit}
            colorScheme={isHCRIDocAgreed ? 'green' : 'red'}
          />
        )}
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
              {`View all Supervisors`}
            </Button>

            <Button
              colorScheme="primary"
              variant="outline"
              onClick={() =>
                onSendMessage({
                  code: 'QUE_QA_HOST_CPY_REP_MENU',
                  parentCode: 'QUE_ADD_ITEMS_GRP',
                })
              }
            >
              {`Add Supervisors`}
            </Button>
          </VStack>
        </Box>
      </Stack>
      <Process dashboard />
    </VStack>
  )
}

export default HostCompanyRep
