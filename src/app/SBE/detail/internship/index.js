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
  attributes: ['PRI_NAME', 'PRI_MOBILE', 'PRI_EMAIL', 'PRI_ADDRESS_FULL'],
}

const internshipDetail = {
  sectionIcon: faBriefcase,
  title: 'Internship Details',
  attributes: [
    'PRI_WORKSITE',
    'PRI_INTERNSHIP_START_DATE',
    'PRI_WHICH_DAYS_STRIPPED',
    'PRI_DRESS_CODE',
    'PRI_ASSOC_NUM_INTERNS',
  ],
}

const responsibilities = {
  sectionIcon: faGraduationCap,
  title: 'Responsibilities',
  attributes: ['PRI_ROLES_AND_RESPONSIBILITIES'],
}

const basicLearningOutcome = {
  sectionIcon: faGraduationCap,
  title: 'Basic Learning Outcome',
  attributes: ['PRI_BASE_LEARNING_OUTCOMES'],
}

const technicalSkills = {
  sectionIcon: faGraduationCap,
  title: 'Technical Skills',
  attributes: ['PRI_SPECIFIC_LEARNING_OUTCOMES'],
}

const Internship = ({ sbeCode, targetCode }) => {
  const sbe = useSelector(selectCode(sbeCode))

  const rows = useSelector(selectRows(sbeCode))

  if (!sbe) return null

  const beCode = targetCode ? targetCode : rows?.length ? rows[0] : null

  const actions = getActions(sbe)

  if (!beCode) return null

  const imageAttribute = 'PRI_IMAGE_URL'
  const headerAttribute = 'PRI_ASSOC_HC'

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
      <DetailSection code={beCode} details={internshipDetail} />
      <Divider />
      <DetailSection code={beCode} details={responsibilities} />
      <Divider />
      <DetailSection code={beCode} details={basicLearningOutcome} />
      <Divider />
      <DetailSection code={beCode} details={technicalSkills} />
    </Box>
  )
}

export default Internship
