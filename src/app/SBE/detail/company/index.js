import { FontAwesomeIcon } from '@fortawesome/react-fontawesome'
import { faDownload, faEdit, faHandshake, faUser } from '@fortawesome/free-solid-svg-icons'

import DetailLayout from '../layout'
import { replace } from 'ramda'
import Lane from 'app/SBE/lane'
import { useIsMobile } from 'utils/hooks'
import { useSelector } from 'react-redux'
import { selectCode } from 'redux/db/selectors'
import Card from 'app/layouts/components/card'
import { VStack, Text } from '@chakra-ui/react'
import Button from 'app/layouts/components/button'
import { onSendMessage } from 'vertx'

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
  const internships = (
    <Lane
      width={tileWidth}
      sbeCode={replace('SBE_HOST_CPY_', 'SBE_LINKED_INTERNSHIP_OPP_', sbeCode)}
    />
  )

  const ohs =
    validation?.value === 'OHS' || validation?.value === 'Ready' ? (
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
    validation?.value === 'HCS' || validation?.value === 'Ready' ? (
      <Button
        colorScheme="green"
        leftIcon={<FontAwesomeIcon icon={faDownload} />}
        onClick={() => onSendMessage({ targetCode, parentCode: sbeCode, code: 'ACT_HCS_DOC' })}
      >
        Host Company Service Agreement
      </Button>
    ) : (
      <Button
        colorScheme="red"
        leftIcon={<FontAwesomeIcon icon={faEdit} />}
        onClick={() => onSendMessage({ targetCode, parentCode: sbeCode, code: 'ACT_HCS_DOC' })}
      >
        Host Company Service Agreement
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
