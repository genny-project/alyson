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
  attributes: ['PRI_MOBILE', 'PRI_EMAIL'],
}

const companyDetails = {
  sectionIcon: faBriefcase,
  title: 'Company Details',
  attributes: ['PRI_ASSOC_HC', 'PRI_JOB_TITLE'],
}

const aboutMyself = {
  sectionIcon: faGraduationCap,
  title: 'About Myself',
  attributes: ['PRI_BIO'],
}

const Rep = ({ sbeCode, targetCode }) => {
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
      <DetailSection code={beCode} details={companyDetails} />
      <Divider />
      <DetailSection code={beCode} details={aboutMyself} />
    </Box>
  )
}

export default Rep
