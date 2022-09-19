import { Box, HStack, Stack, Text, VStack } from '@chakra-ui/layout'
import { callBucketView, onSendMessage } from 'vertx'
import { faBriefcase, faCheckCircle, faDownload, faEdit } from '@fortawesome/free-solid-svg-icons'
import { selectAttributes, selectCode } from 'redux/db/selectors'

import Attribute from 'app/BE/attribute'
import { Button } from '@chakra-ui/button'
import Card from 'app/layouts/components/card'
import { FontAwesomeIcon } from '@fortawesome/react-fontawesome'
import Process from 'app/layouts/process'
import { useColorModeValue } from '@chakra-ui/color-mode'
import { useEffect } from 'react'
import { useSelector } from 'react-redux'

const HostCompanyRep = ({ userCode }) => {
  const [name, hc, jobTitle] = useSelector(
    selectAttributes(userCode, ['PRI_NAME', 'PRI_ASSOC_HC', 'PRI_JOB_TITLE']),
  )
  const companyCode = useSelector(selectCode('COMPANY'))
  const validation = useSelector(selectCode(companyCode, 'PRI_VALIDATION'))
  const hcValidation = useSelector(selectCode(companyCode, 'PRI_HC_VALIDATION_DOC_URL')) || ''
  const hcValidationUrl = hcValidation?.value

  const digitalJobsAgreement = useSelector(selectCode(companyCode, 'LNK_VIC_GOV_DIGITAL_JOBS'))
    ?.value
  const digitalJobsAgreementValidation = useSelector(
    selectCode(companyCode, 'PRI_DJP_DOCUMENT_ACCEPTED'),
  )?.value

  const ohs =
    validation?.value === 'OHS' ||
    validation?.value === 'Ready' ||
    validation?.value === 'Validated' ? (
      <Button
        size="sm"
        onClick={() => onSendMessage({ targetCode: companyCode, code: 'ACT_OHS_DOC' })}
        leftIcon={<FontAwesomeIcon icon={faDownload} />}
      >
        {`OH&S Declaration`}
      </Button>
    ) : (
      <Button
        size="sm"
        colorScheme="red"
        onClick={() => onSendMessage({ targetCode: companyCode, code: 'ACT_OHS_DOC' })}
        leftIcon={<FontAwesomeIcon icon={faEdit} />}
      >
        {`OH&S Declaration`}
      </Button>
    )

  const hcs =
    validation?.value === 'HCS' ||
    validation?.value === 'Ready' ||
    validation?.value === 'Validated' ? (
      <Button
        size="sm"
        leftIcon={<FontAwesomeIcon icon={faDownload} />}
        onClick={() => onSendMessage({ targetCode: companyCode, code: 'ACT_HCS_DOC' })}
      >
        Host Company Placement Agreement
      </Button>
    ) : (
      <Button
        size="sm"
        colorScheme="red"
        leftIcon={<FontAwesomeIcon icon={faEdit} />}
        onClick={() => onSendMessage({ targetCode: companyCode, code: 'ACT_HCS_DOC' })}
      >
        Host Company Placement Agreement
      </Button>
    )

  const hcValidationButton = !!hcValidationUrl && (
    <Button
      size="sm"
      onClick={() => window.open(hcValidationUrl)}
      leftIcon={<FontAwesomeIcon icon={faDownload} />}
    >
      {`Host Company Validation`}
    </Button>
  )

  const digitalJobsButton = digitalJobsAgreement === 'true' && (
    <Button
      size="sm"
      onClick={() => onSendMessage({ targetCode: companyCode, code: 'ACT_DJP_DOC' })}
      leftIcon={<FontAwesomeIcon icon={digitalJobsAgreementValidation ? faDownload : faEdit} />}
      colorScheme={digitalJobsAgreementValidation ? 'gray' : 'red'}
    >
      {`Digital Jobs Program Host Employer Subsidy Agreement`}
    </Button>
  )

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
        {ohs}
        {hcs}
        {hcValidationButton}
        {digitalJobsButton}
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
