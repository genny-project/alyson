import { useSelector } from 'react-redux'
import { selectCode, selectRows } from 'redux/db/selectors'
import { faUser, faBriefcase, faGraduationCap } from '@fortawesome/free-solid-svg-icons'
import { Box, Divider } from '@chakra-ui/react'

import Header from './templates/header'
import DetailSection from './templates/detail-section'
import getActions from 'app/SBE/utils/get-actions'

const contactDetails = {
  sectionIcon: faUser,
  title: 'Contact Details',
  attributes: [
    'PRI_LEGAL_NAME',
    'PRI_ABN',
    'PRI_MOBILE',
    'PRI_COMPANY_WEBSITE_URL',
    'PRI_ADDRESS_FULL',
  ],
}

const industryDetails = {
  sectionIcon: faBriefcase,
  title: 'Industry Details',
  attributes: ['PRI_STATUS', 'PRI_ASSOC_INDUSTRY', 'PRI_LINKEDIN_URL'],
}

const companyDescription = {
  sectionIcon: faGraduationCap,
  title: 'Company Description',
  attributes: ['PRI_COMPANY_DESCRIPTION'],
}

const Cv = ({ sbeCode }) => {
  const sbe = useSelector(selectCode(sbeCode))
  const rows = useSelector(selectRows(sbeCode))

  if (!sbe || !rows.length) return null

  const code = rows[0]
  const actions = getActions(sbe)

  const imageAttribute = 'PRI_IMAGE_URL'
  const headerAttribute = 'PRI_NAME'

  return (
    <Box>
      <Header
        code={code}
        sbeCode={sbeCode}
        imageSrc={imageAttribute}
        headerAttribute={headerAttribute}
        actions={actions}
      />
      <Divider />
      <DetailSection code={code} details={contactDetails} />
      <Divider />
      <DetailSection code={code} details={industryDetails} />
      <Divider />
      <DetailSection code={code} details={companyDescription} />
    </Box>
  )
}

export default Cv
