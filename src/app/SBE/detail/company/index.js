import { FontAwesomeIcon } from '@fortawesome/react-fontawesome'
import { faHandshake, faUser } from '@fortawesome/free-solid-svg-icons'

import DetailLayout from '../layout'
import { replace } from 'ramda'
import Lane from 'app/SBE/lane'

const contactDetails = {
  header: 'Contact Details',
  icon: <FontAwesomeIcon size="lg" icon={faUser} />,
  attributes: [
    { attr: 'PRI_LEGAL_NAME', label: 'Legal Name' },
    { attr: 'PRI_MOBILE', label: 'Phone Number', color: 'blue.500' },
    { attr: 'PRI_EMAIL', label: 'Email', color: 'blue.500' },
    { attr: 'PRI_ADDRESS_FULL', label: 'Address', color: 'blue.500' },
  ],
}

const about = {
  header: 'About Myself',
  icon: <FontAwesomeIcon size="lg" icon={faHandshake} />,
  attributes: [{ attr: 'PRI_BIO' }],
}

const Rep = ({ sbeCode, targetCode }) => {
  const internships = (
    <Lane sbeCode={replace('SBE_HOST_CPY_', 'SBE_LINKED_INTERNSHIP_OPP_', sbeCode)} />
  )

  const details = [[contactDetails, about], [internships]]

  return <DetailLayout sbeCode={sbeCode} targetCode={targetCode} details={details} />
}

export default Rep
