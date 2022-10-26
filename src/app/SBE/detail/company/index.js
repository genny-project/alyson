import { Text, VStack } from '@chakra-ui/react'
import { equals, replace } from 'ramda'
import { faDownload, faEdit, faHandshake, faUser } from '@fortawesome/free-solid-svg-icons'

import Button from 'app/layouts/components/button'
import Card from 'app/layouts/components/card'
import DetailLayout from '../layout'
import { FontAwesomeIcon } from '@fortawesome/react-fontawesome'
import Lane from 'app/SBE/lane'
import { onSendMessage } from 'vertx'
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

const Rep = ({ sbeCode, targetCode, userType }) => {
  const tileWidth = useIsMobile() ? '90vw' : '33vw'
  const validation = useSelector(selectCode(targetCode, 'PRI_VALIDATION'))
  const hcValidation = useSelector(selectCode(targetCode, 'PRI_HC_VALIDATION_DOC_URL')) || ''
  const hcValidationUrl = hcValidation?.value

  const digitalJobsAgreement = useSelector(selectCode(targetCode, 'LNK_VIC_GOV_DIGITAL_JOBS'))
    ?.value
  const digitalJobsValidation = useSelector(selectCode(targetCode, 'PRI_DJP_DOCUMENT_ACCEPTED'))
    ?.value

  const hasOHSDoc = useSelector(selectCode(targetCode, 'PRI_DOC_OHS'))?.value
  const OHSDocStatus = useSelector(selectCode(targetCode, 'PRI_DOC_OHS_STATUS'))?.value
  const isOHSDocAgreed = equals(OHSDocStatus)('Complete')

  const hasDJPDoc = useSelector(selectCode(targetCode, 'PRI_DOC_DJP'))?.value
  const DJPDocStatus = useSelector(selectCode(targetCode, 'PRI_DOC_DJP_STATUS'))?.value
  const isDJPDocAgreed = equals(DJPDocStatus)('Complete')

  const hasHCSDoc = useSelector(selectCode(targetCode, 'PRI_DOC_OHS'))?.value
  const HCSDocStatus = useSelector(selectCode(targetCode, 'PRI_DOC_OHS_STATUS'))?.value
  const isHCSDocAgreed = equals(HCSDocStatus)('Complete')

  const hasHCRIDoc = useSelector(selectCode(targetCode, 'PRI_DOC_HCRI'))?.value
  const HCRIDocStatus = useSelector(selectCode(targetCode, 'PRI_DOC_HCRI_STATUS'))?.value
  const isHCRIDocAgreed = equals(HCRIDocStatus)('Complete')

  const internships = (
    <Lane
      width={tileWidth}
      sbeCode={replace('SBE_HOST_CPY_', 'SBE_LINKED_INTERNSHIP_OPP_', sbeCode)}
    />
  )

  const DocButtons = ({ actionCode = '', buttonName = '', icon = faEdit, colorScheme = 'red' }) => {
    return (
      <Button
        size="sm"
        leftIcon={<FontAwesomeIcon icon={icon} />}
        onClick={() => onSendMessage({ targetCode, parentCode: sbeCode, code: actionCode })}
        colorScheme={colorScheme}
      >
        {buttonName}
      </Button>
    )
  }

  // const ohs =
  //   validation?.value === 'OHS' ||
  //   validation?.value === 'Ready' ||
  //   validation?.value === 'Validated' ? (
  //     <Button
  //       colorScheme="green"
  //       onClick={() => onSendMessage({ targetCode, parentCode: sbeCode, code: 'ACT_OHS_DOC' })}
  //       leftIcon={<FontAwesomeIcon icon={faDownload} />}
  //     >
  //       {`OH&S Declaration`}
  //     </Button>
  //   ) : (
  //     <Button
  //       colorScheme="red"
  //       onClick={() => onSendMessage({ targetCode, parentCode: sbeCode, code: 'ACT_OHS_DOC' })}
  //       leftIcon={<FontAwesomeIcon icon={faEdit} />}
  //     >
  //       {`OH&S Declaration`}
  //     </Button>
  //   )

  // const hcs =
  //   validation?.value === 'HCS' ||
  //   validation?.value === 'Ready' ||
  //   validation?.value === 'Validated' ? (
  //     <Button
  //       colorScheme="green"
  //       leftIcon={<FontAwesomeIcon icon={faDownload} />}
  //       onClick={() => onSendMessage({ targetCode, parentCode: sbeCode, code: 'ACT_HCS_DOC' })}
  //     >
  //       {`Host Company Placement Agreement`}
  //     </Button>
  //   ) : (
  //     <Button
  //       colorScheme="red"
  //       leftIcon={<FontAwesomeIcon icon={faEdit} />}
  //       onClick={() => onSendMessage({ targetCode, parentCode: sbeCode, code: 'ACT_HCS_DOC' })}
  //     >
  //       {`Host Company Placement Agreement`}
  //     </Button>
  //   )

  // const hcValidationButton = !!hcValidationUrl && equals(userType)('AGENT') && (
  //   <Button
  //     variant="secondary"
  //     colorScheme="green"
  //     onClick={() => onSendMessage({ targetCode, parentCode: sbeCode, code: 'ACT_HCV_DOC' })}
  //     leftIcon={<FontAwesomeIcon icon={faDownload} />}
  //   >
  //     {`Host Company Validation`}
  //   </Button>
  // )

  // const digitalJobsButton =
  //   digitalJobsAgreement === 'true' && digitalJobsValidation ? (
  //     <Button
  //       onClick={() => onSendMessage({ targetCode, parentCode: sbeCode, code: 'ACT_DJP_DOC' })}
  //       leftIcon={<FontAwesomeIcon icon={faDownload} />}
  //       colorScheme={'green'}
  //     >
  //       {`Digital Jobs Program Host Employer Subsidy Agreement`}
  //     </Button>
  //   ) : digitalJobsAgreement === 'true' ? (
  //     <Button
  //       onClick={() => onSendMessage({ targetCode, parentCode: sbeCode, code: 'ACT_DJP_DOC' })}
  //       leftIcon={<FontAwesomeIcon icon={faEdit} />}
  //       colorScheme={'red'}
  //     >
  //       {`Digital Jobs Program Host Employer Subsidy Agreement`}
  //     </Button>
  //   ) : (
  //     <></>
  //   )

  const documents = (
    <Card variant="card0" w={tileWidth}>
      <VStack align="start">
        <Text textStyle="body.1">
          {!validation?.value || validation?.value === 'Incomplete'
            ? 'Please complete documents'
            : 'Documents'}
        </Text>

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
            buttonName="Host Company Placement Agreement"
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

        {/* {ohs}
        {hcs}
        {hcValidationButton}
        {digitalJobsButton} */}
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
