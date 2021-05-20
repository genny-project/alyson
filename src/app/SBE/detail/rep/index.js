import { FontAwesomeIcon } from '@fortawesome/react-fontawesome'
import { faHandshake, faUser } from '@fortawesome/free-solid-svg-icons'

import DetailLayout from '../layout'
import LinkedInternships from './linked_internships'
import { replace } from 'ramda'

const contactDetails = {
  header: 'Contact Details',
  icon: <FontAwesomeIcon size="lg" icon={faUser} />,
  attributes: [
    { attr: 'PRI_NAME', label: 'Full Name' },
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
    <LinkedInternships
      sbeCode={replace('SBE_HOST_CPY_REP_', 'SBE_LINKED_INTERNSHIP_OF_SUPERVISOR_', sbeCode)}
    />
  )

  const details = [[contactDetails, about], [internships]]

  return <DetailLayout sbeCode={sbeCode} targetCode={targetCode} details={details} />
}

export default Rep
