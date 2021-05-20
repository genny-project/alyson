import { FontAwesomeIcon } from '@fortawesome/react-fontawesome'
import { faHandshake, faMapPin, faUser } from '@fortawesome/free-solid-svg-icons'

import DetailLayout from '../layout'
import { replace } from 'ramda'
import Lane from 'app/SBE/lane'
import { useIsMobile } from 'utils/hooks'

const contactDetails = {
  header: 'Contact Details',
  icon: <FontAwesomeIcon size="lg" icon={faUser} />,
  attributes: [
    { attr: 'PRI_LEGAL_NAME', label: 'Legal Name' },
    { attr: 'PRI_MOBILE', label: 'Phone Number', color: 'blue.500' },
    { attr: 'PRI_EMAIL', label: 'Email', color: 'blue.500' },
    { attr: 'PRI_ADDRESS_FULL', label: 'Address', color: 'blue.500' },
    { attr: 'PRI_WEBSITE', label: 'Website' },
  ],
}

const about = {
  header: 'About Us',
  icon: <FontAwesomeIcon size="lg" icon={faHandshake} />,
  attributes: [{ attr: 'PRI_COMPANY_DESCRIPTION' }],
}

const Rep = ({ sbeCode, targetCode }) => {
  const tileWidth = useIsMobile() ? '80vw' : '33vw'

  const internships = (
    <Lane
      width={tileWidth}
      sbeCode={replace('SBE_HOST_CPY_', 'SBE_LINKED_INTERNSHIP_OPP_', sbeCode)}
    />
  )

  const details = [[contactDetails, about], [internships]]

  return <DetailLayout sbeCode={sbeCode} targetCode={targetCode} details={details} />
}

export default Rep
