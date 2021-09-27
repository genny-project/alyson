import { FontAwesomeIcon } from '@fortawesome/react-fontawesome'
import { faHandshake, faUser } from '@fortawesome/free-solid-svg-icons'

import DetailLayout from '../layout'

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
  const details = [[contactDetails, about]]

  return <DetailLayout sbeCode={sbeCode} targetCode={targetCode} details={details} />
}

export default Rep
