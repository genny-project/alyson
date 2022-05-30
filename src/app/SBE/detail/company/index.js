import { Text, VStack } from '@chakra-ui/react'
import { faDownload, faEdit, faHandshake, faUser } from '@fortawesome/free-solid-svg-icons'

import Button from 'app/layouts/components/button'
import Card from 'app/layouts/components/card'
import DetailLayout from '../layout'
import { FontAwesomeIcon } from '@fortawesome/react-fontawesome'
import Lane from 'app/SBE/lane'
import { onSendMessage } from 'vertx'
import { replace } from 'ramda'
import { selectCode } from 'redux/db/selectors'
import { useIsMobile } from 'utils/hooks'
import { useSelector } from 'react-redux'

const contactDetails = {
  header: 'Contact Details',
  icon: <FontAwesomeIcon size="lg" icon={faUser} />,
  attributes: [
    { attr: 'PRI_LEGAL_NAME', label: 'Legal Name' },
    { attr: 'PRI_MOBILE', label: 'Phone Number', color: 'blue.500' },
    { attr: 'PRI_EMAIL', label: 'Email', color: 'blue.500' },
    { attr: 'PRI_ADDRESS_FULL', label: 'Address', color: 'blue.500', config: { collapse: true } },
    { attr: 'PRI_COMPANY_WEBSITE_URL', label: 'Website' },
  ],
}

const about = {
  header: 'About Us',
  icon: <FontAwesomeIcon size="lg" icon={faHandshake} />,
  attributes: [{ attr: 'PRI_COMPANY_DESCRIPTION' }],
}

const Rep = ({ sbeCode, targetCode }) => {
  const tileWidth = useIsMobile() ? '90vw' : '33vw'
  const validation = useSelector(selectCode(targetCode, 'PRI_VALIDATION'))
  const hcValidation = useSelector(selectCode(targetCode, 'PRI_HC_VALIDATION_DOC_URL')) || ''
  const hcValidationUrl = hcValidation?.value
  const digitalJobsAgreement = useSelector(selectCode(targetCode, 'LNK_VIC_GOV_DIGITAL_JOBS')) || ''
  const digitalJobsValidation = useSelector(selectCode(targetCode, 'LNK_VIC_GOV_DIGITAL_JOBS'))
    ?.value

  const internships = (
    <Lane
      width={tileWidth}
      sbeCode={replace('SBE_HOST_CPY_', 'SBE_LINKED_INTERNSHIP_OPP_', sbeCode)}
    />
  )

  const ohs =
    validation?.value === 'OHS' ||
    validation?.value === 'Ready' ||
    validation?.value === 'Validated' ? (
      <Button
        colorScheme="green"
        onClick={() => onSendMessage({ targetCode, parentCode: sbeCode, code: 'ACT_OHS_DOC' })}
        leftIcon={<FontAwesomeIcon icon={faDownload} />}
      >
        {`OH&S Declaration`}
      </Button>
    ) : (
      <Button
        colorScheme="red"
        onClick={() => onSendMessage({ targetCode, parentCode: sbeCode, code: 'ACT_OHS_DOC' })}
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
        colorScheme="green"
        leftIcon={<FontAwesomeIcon icon={faDownload} />}
        onClick={() => onSendMessage({ targetCode, parentCode: sbeCode, code: 'ACT_HCS_DOC' })}
      >
        {`Host Company Placement Agreement`}
      </Button>
    ) : (
      <Button
        colorScheme="red"
        leftIcon={<FontAwesomeIcon icon={faEdit} />}
        onClick={() => onSendMessage({ targetCode, parentCode: sbeCode, code: 'ACT_HCS_DOC' })}
      >
        {`Host Company Placement Agreement`}
      </Button>
    )

  const hcValidationButton = !!hcValidationUrl && (
    <Button
      variant="secondary"
      colorScheme="green"
      onClick={() => window.open(hcValidationUrl)}
      leftIcon={<FontAwesomeIcon icon={faDownload} />}
    >
      {`Host Company Validation`}
    </Button>
  )

  const digitalJobsButton = !!digitalJobsAgreement && (
    <Button
      size="sm"
      onClick={() => onSendMessage({ targetCode, parentCode: sbeCode, code: 'ACT_DJP_DOC' })}
      leftIcon={<FontAwesomeIcon icon={faEdit} />}
      colorScheme={digitalJobsValidation ? 'green' : 'red'}
    >
      {`Digital Jobs Participant Agreement`}
    </Button>
  )

  const documents = (
    <Card variant="card0" w={tileWidth}>
      <VStack align="start">
        <Text textStyle="body.1">
          {!validation?.value || validation?.value === 'Incomplete'
            ? 'Please complete documents'
            : 'Documents'}
        </Text>
        {ohs}
        {hcs}
        {hcValidationButton}
        {digitalJobsButton}
      </VStack>
    </Card>
  )

  const details = [
    [contactDetails, about],
    [documents, internships],
  ]

  return <DetailLayout sbeCode={sbeCode} targetCode={targetCode} details={details} />
}

export default Rep
