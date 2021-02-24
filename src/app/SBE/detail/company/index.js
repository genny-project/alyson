import { useSelector } from 'react-redux'
import { selectCode, selectRows } from 'redux/db/selectors'
import { faUser, faBriefcase, faGraduationCap } from '@fortawesome/free-solid-svg-icons'
import { Box, Divider } from '@chakra-ui/react'

import Header from './templates/header'
import DetailSection from '../default-view/templates/detail-section'
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

const Cv = ({ sbeCode, targetCode }) => {
  const sbe = useSelector(selectCode(sbeCode))

  const rows = useSelector(selectRows(sbeCode))

  if (!sbe) return null

  const beCode = targetCode ? targetCode : rows?.length ? rows[0] : null

  const actions = getActions(sbe)

  if (!beCode) return null

  const imageAttribute = 'PRI_IMAGE_URL'
  const headerAttribute = 'PRI_NAME'

  return (
    <Box>
      <Header
        code={beCode}
        sbeCode={sbeCode}
        imageSrc={imageAttribute}
        headerAttribute={headerAttribute}
        actions={actions}
      />
      <Divider />
      <DetailSection code={beCode} details={contactDetails} />
      <Divider />
      <DetailSection code={beCode} details={industryDetails} />
      <Divider />
      <DetailSection code={beCode} details={companyDescription} />
    </Box>
  )
}

export default Cv
